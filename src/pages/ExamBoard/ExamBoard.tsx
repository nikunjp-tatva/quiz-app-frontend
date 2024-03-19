import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { useParams, useNavigate } from 'react-router-dom';

import QuestionList from './QuestionList';
import BoxHeader from './BoxHeader';
import ExamTimer from './ExamTimer';
import QuestionData from './QuestionData';
import { getExamResultDetails, saveExamResult } from '../../services/exam.service';
import ExamStartDialog from './ExamStartDialog';

type TechnologyType = {
    cutOff?: number;
    description?: string;
    duration?: number;
    id: string;
    name: string;
    noOfQuestion?: number
}

type QuestionDataType = {
    id: string;
    options: string[];
    questionText: string;
    serialNo: string;
    bgColor?: string;
    status?: string;
    selectedOption?: string;
}

export default function ExamBoard() {
    const { technologyId } = useParams();

    const [isExamStart, setIsExamStart] = useState(false);
    const [userSpentTime, setUserSpentTime] = useState<number>(0);

    const [questionsData, setQuestionsData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [technologyDetails, setTechnologyDetails] = useState<TechnologyType>({
        cutOff: undefined,
        description: '',
        duration: undefined,
        id: '',
        name: '',
        noOfQuestion: undefined,
    });
    const [currentPageNo, setCurrentPageNo] = useState('1');

    const addRequiredFieldsInQuestions = (questionData: QuestionDataType[]) => {
        const updatedQuestionList = questionData.map((question: QuestionDataType, index: number) => {
            question.serialNo = (index + 1).toString();
            question.bgColor = '';
            question.status = '';
            return question;
        });
        const initialValue: any = {};
        return updatedQuestionList.reduce((prev: any, question: QuestionDataType) => {
            prev[question.serialNo] = question;
            return prev;
        }, initialValue);
    }

    useEffect(() => {
        setIsLoading(true);
        setError('');
        technologyId && getExamResultDetails(technologyId).then(({ data }) => {
            setQuestionsData(addRequiredFieldsInQuestions(data?.questions));
            setTechnologyDetails(data?.technology);
        }).catch((error) => { setIsLoading(true); setError(error?.response?.data?.message || error.message) });

        setIsLoading(false);
        setError('');

    }, [technologyId]);


    const handleQuestionChange = ({ target }: any) => setCurrentPageNo(prevPageNo => {
        const newQuestionPage = target.innerText;
        if (prevPageNo === newQuestionPage) {
            return newQuestionPage;
        }

        setQuestionsData((prevQuestionData: { [x: string]: any; }) => {
            const questionData = prevQuestionData[prevPageNo];

            if (questionData?.status !== 'MarkForReview') {
                if (questionData?.selectedOption && questionData?.selectedOption !== '') {
                    questionData.bgColor = '#398B39';
                    questionData.status = 'Answered';
                }
                if (!questionData?.selectedOption || questionData.selectedOption === '') {
                    questionData.bgColor = '#DA7B03';
                    questionData.status = 'Not Answered';
                }
            }
            return { ...prevQuestionData, [prevPageNo]: questionData };
        });

        return newQuestionPage;
    });

    const handlePreviousPageClick = () => setCurrentPageNo(prevQuestion => {
        const parsedPage = Number(prevQuestion);
        if (parsedPage === 1) {
            return prevQuestion;
        }

        setQuestionsData((prevQuestionData: { [x: string]: any; }) => {
            const questionData = prevQuestionData[prevQuestion];

            if (questionData?.status !== 'MarkForReview') {
                if (questionData?.selectedOption && questionData?.selectedOption !== '') {
                    questionData.bgColor = '#398B39';
                    questionData.status = 'Answered';
                }
                if (!questionData?.selectedOption || questionData.selectedOption === '') {
                    questionData.bgColor = '#DA7B03';
                    questionData.status = 'Not Answered';
                }
            }
            return { ...prevQuestionData, [prevQuestion]: questionData };
        });

        return (parsedPage - 1).toString()
    });

    const handleNextPageClick = () => setCurrentPageNo(prevQuestion => {
        const parsedPage = Number(prevQuestion);
        if (parsedPage === Object.keys(questionsData).length) {
            return prevQuestion;
        }

        setQuestionsData((prevQuestionData: { [x: string]: any; }) => {
            const questionData = prevQuestionData[prevQuestion];

            if (questionData?.status !== 'MarkForReview') {
                if (questionData?.selectedOption && questionData?.selectedOption !== '') {
                    questionData.bgColor = '#398B39';
                    questionData.status = 'Answered';
                }
                if (!questionData?.selectedOption || questionData.selectedOption === '') {
                    questionData.bgColor = '#DA7B03';
                    questionData.status = 'Not Answered';
                }
            }
            return { ...prevQuestionData, [prevQuestion]: questionData };
        });

        return (parsedPage + 1).toString()
    });

    const handleMarkReviewButtonClick = () => setQuestionsData((prev: any) => {
        const questionData = prev[currentPageNo];
        questionData.bgColor = '#A40503';
        questionData.status = 'MarkForReview';
        return { ...prev, [currentPageNo]: questionData };
    });

    const handleUnMarkReviewButtonClick = () => setQuestionsData((prev: any) => {
        const questionData = prev[currentPageNo];
        questionData.bgColor = '';
        questionData.status = '';
        return { ...prev, [currentPageNo]: questionData };
    });

    const handleQuestionOptionChange = (event: any) => setQuestionsData((prev: any) => {
        const questionData = prev[currentPageNo];
        questionData.selectedOption = event.target.value;
        return { ...prev, [currentPageNo]: questionData };
    });
    const navigate = useNavigate();

    const handleSubmitButtonClickEvent = async () => {
        // const { technologyId, submittedQuestions, completeTime }

        const response = await saveExamResult({
            technologyId: technologyDetails.id,
            submittedQuestions: Object.values(questionsData),
            completeTime: ((Date.now() - userSpentTime) / 60000),
        });
        navigate('/exam-result', { state: { result: response.data } });
        setUserSpentTime(0);
    }

    const startExam = () => {
        setIsExamStart(true);
        setUserSpentTime(Date.now());
    }

    const examClose = () => {
        navigate('/exams');
    }

    return (
        !isExamStart ? (
            <ExamStartDialog open={!isExamStart} handleClose={examClose} handleConfirm={startExam} />
        ) : (
            <Box sx={{ display: "flex", height: 'calc(100vh - 80px)' }}>
                <Grid container direction="row" sx={{ width: '100%', height: '100%' }}>
                    <Grid item md={8} lg={8.7} xl={9} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box
                            height={40}
                            sx={{ backgroundColor: "#E7E7E7", display: "flex" }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography
                                variant='h5'
                                fontWeight='bold'
                                sx={{ fontSize: "1.1rem" }}
                            >
                                Online Test - {technologyDetails.name}
                            </Typography>
                        </Box>

                        <QuestionData questionDetails={questionsData[currentPageNo]} onOptionSelect={handleQuestionOptionChange} />

                        <Box mt="auto" pl={4} pt={1} pb={1} sx={{ borderTopWidth: 1, backgroundColor: "#F0F0F0" }}>
                            <Box pt={1} pb={1} pr={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Button variant="contained" sx={{
                                    borderRadius: 29, textTransform: 'none', backgroundColor: "#A40503", '&:hover': {
                                        backgroundColor: "#8a0402",
                                    },
                                }}
                                    onClick={questionsData[currentPageNo]?.status === 'MarkForReview' ? handleUnMarkReviewButtonClick : handleMarkReviewButtonClick}
                                >Mark for review</Button>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ borderTopLeftRadius: 29, borderBottomLeftRadius: 29, textTransform: 'none' }}
                                        onClick={handlePreviousPageClick}
                                        disabled={Number(currentPageNo) === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ borderTopRightRadius: 29, borderBottomRightRadius: 29, textTransform: 'none' }}
                                        onClick={handleNextPageClick}
                                        disabled={Number(currentPageNo) === Object.keys(questionsData).length}
                                    >
                                        Next
                                    </Button>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ borderRadius: 29, textTransform: 'none' }}
                                    onClick={handleSubmitButtonClickEvent}
                                >
                                    Submit Test
                                </Button>
                            </Box>

                            <Divider />
                            <Box pl={2} pt={1} pb={1} pr={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Badge variant="dot" sx={{
                                        marginRight: 2,
                                        '& .MuiBadge-badge': {
                                            backgroundColor: "#0468BF",
                                            height: 13,
                                            width: 13,
                                            borderRadius: 4
                                        }
                                    }}>
                                    </Badge>
                                    Current
                                </Box>
                                <Box>
                                    <Badge variant="dot" sx={{
                                        marginRight: 2, marginLeft: 4, '& .MuiBadge-badge': {
                                            backgroundColor: "#F0F0F0",
                                            height: 13,
                                            width: 13,
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                        }
                                    }}>
                                    </Badge>
                                    Not Attempted
                                </Box>
                                <Box>
                                    <Badge variant="dot" sx={{
                                        marginRight: 2, marginLeft: 4, '& .MuiBadge-badge': {
                                            backgroundColor: "#398B39",
                                            height: 13,
                                            width: 13,
                                            borderRadius: 4
                                        }
                                    }}>
                                    </Badge>
                                    Answered
                                </Box>
                                <Box>
                                    <Badge variant="dot" sx={{
                                        marginRight: 2, marginLeft: 4, '& .MuiBadge-badge': {
                                            backgroundColor: "#DA7B03",
                                            height: 13,
                                            width: 13,
                                            borderRadius: 4
                                        }
                                    }}>
                                    </Badge>
                                    Not Answered
                                </Box>
                                <Box>
                                    <Badge variant="dot" sx={{
                                        marginRight: 2, marginLeft: 4, '& .MuiBadge-badge': {
                                            backgroundColor: "#A40503",
                                            height: 13,
                                            width: 13,
                                            borderRadius: 4
                                        }
                                    }}>
                                    </Badge>
                                    Review
                                </Box>
                            </Box>
                        </Box>

                    </Grid>
                    <Divider orientation="vertical" flexItem />

                    <Grid item md={3.98} lg={3.28} xl={2.98}>

                        <BoxHeader title="Time Left" />

                        {technologyDetails?.duration && <ExamTimer examTime={technologyDetails?.duration} onTimerEnds={handleSubmitButtonClickEvent} />}

                        <BoxHeader title="Questions" />

                        <QuestionList questions={Object.values(questionsData)} currentPage={currentPageNo}
                            handleQuestionListClick={handleQuestionChange}
                        />

                    </Grid>
                </Grid>
            </Box >)

    )
}
