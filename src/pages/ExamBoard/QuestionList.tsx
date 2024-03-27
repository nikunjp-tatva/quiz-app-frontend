import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { COLOR } from "../../config/config";

type questionType = {
    id: string | null | number;
    bgColor?: string | null;
    serialNo: string | number;
};
type handleQuestionListClickType = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
) => void;

type QuestionListProps = {
    questions: questionType[];
    handleQuestionListClick: handleQuestionListClickType;
    currentPage: string;
};

export default function QuestionList({
    questions,
    handleQuestionListClick,
    currentPage,
}: Readonly<QuestionListProps>) {
    if (!Array.isArray(questions) || !questions?.length) {
        return null;
    }

    return (
        <Grid container spacing={2} p={2}>
            {questions.map((question: questionType) => {
                let backColor = COLOR.EXAM_BACKGROUND;
                let fontColor = "#000";

                if (question?.bgColor && question?.bgColor !== COLOR.EXAM_BACKGROUND) {
                    backColor = question.bgColor;
                    fontColor = "#fff";
                }

                if (currentPage === question.serialNo) {
                    backColor = COLOR.CURRENT;
                    fontColor = "#fff";
                }

                return (
                    <Grid item xs={4} md={3} lg={3} xl={2} key={question.id} gap={1}>
                        <Box
                            sx={{
                                backgroundColor: backColor,
                                borderTopLeftRadius: 20,
                                display: "flex",
                                color: fontColor,
                            }}
                            height={45}
                            width={45}
                            justifyContent="center"
                            alignItems="center"
                            onClick={handleQuestionListClick}
                        >
                            {question.serialNo}
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );
}
