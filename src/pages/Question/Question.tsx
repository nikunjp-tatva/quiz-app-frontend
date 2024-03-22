import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_EditActionButtons,
    MRT_Row,
} from 'material-react-table';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from 'react-router-dom';

import InfoTextIcon from '../../common/InfoTextIcon';
import {
    convertOptionStringToArray,
    convertOptionsArrayToString,
    validateQuestion
} from './questionValidation';
import { addQuestion, getQuestions, updateQuestionById } from '../../services/question.service';
import { getTechnologiesList } from '../../services/technology.service';
import ErrorMessage from '../../common/ErrorMessage';
import { PATH } from '../../config/config';

export type QuestionType = {
    id: string;
    technology: string;
    questionText: string;
    options: string[];
    correctOption: string;
};

const CustomSelectEditor = (row: MRT_Row<QuestionType>, technologyList: any[]) => {
    return (
        <div>{technologyList.find((item) => item.value === row.original.technology)?.label}</div>
    );
};

const Question = () => {
    const history = useNavigate();

    const [data, setData] = useState<QuestionType[]>([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [technologyList, setTechnologyList] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }

            try {
                const response = await getQuestions();
                const questionList = response?.data?.results?.map((question: any) => ({
                    id: question.id,
                    questionText: question.questionText,
                    technology: question?.technology?.id,
                    options: question?.options,
                    correctOption: question?.correctOption
                }));
                setData(questionList);
            } catch (error: any) {
                if (error?.response?.status === 401) {
                    history(PATH.UNAUTHORIZED);
                }
                if (error?.response?.status === 403) {
                    history(PATH.FORBIDDEN);
                }
                setIsLoading(false);
                setIsError(true);
                console.error(error);
                return;
            }
            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
        };

        getTechnologiesList().then(({ data }) => {
            setTechnologyList(data.map((item: { name: string; id: string; }) => ({
                label: item.name,
                value: item.id
            })));

            fetchData();
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<QuestionType>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                size: 80,
                visibleInShowHideMenu: false,
                enableHiding: false,
                Edit: () => null,
            },
            {
                id: 'technology',
                accessorFn: (row) => technologyList.find((item) => item.value === row.technology)?.value,
                Cell: ({ row }) => CustomSelectEditor(row, technologyList),
                header: 'Technology Name',
                editVariant: 'select',
                editSelectOptions: technologyList,
                size: 150,
                enableHiding: false,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.technology,
                    helperText: validationErrors?.technology,

                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            technology: undefined,
                        }),
                    onChange: () => setErrorMessage(""),
                },
            },
            {
                accessorKey: 'questionText',
                header: 'Question Text',
                size: 150,
                enableHiding: false,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.questionText,
                    helperText: validationErrors?.questionText,

                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            questionText: undefined,
                        }),
                    onChange: () => setErrorMessage(""),
                },
            },
            {
                accessorKey: 'options',
                header: (<InfoTextIcon headerName="Options" titleText='Enter in string with "," separated. Eg. (Yes, No, All)' />),
                accessorFn: (row) => {
                    if (typeof row?.options === 'object' && row?.options?.length) {
                        return convertOptionsArrayToString(row.options);
                    }
                    return row.options;
                },
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.options,
                    helperText: validationErrors?.options,

                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            options: undefined,
                        }),
                    onChange: () => setErrorMessage(""),
                },
            },
            {
                accessorKey: 'correctOption',
                header: 'Correct Option',
                size: 150,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.correctOption,
                    helperText: validationErrors?.correctOption,

                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            correctOption: undefined,
                        }),
                    onChange: () => setErrorMessage(""),
                },
            },
        ],
        [technologyList, validationErrors],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableEditing: true,
        editDisplayMode: 'modal',
        createDisplayMode: 'modal',
        positionActionsColumn: 'last',
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableColumnFilters: false,
        enableRowNumbers: true,
        enableColumnActions: false,
        muiTableBodyRowProps: { hover: false },

        onEditingRowCancel: () => { setValidationErrors({}); setErrorMessage("") },
        onEditingRowSave: async ({ table, values }) => {

            const newValidationErrors = validateQuestion(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }

            setValidationErrors({});

            const updatedValues = { ...values };
            updatedValues.options = convertOptionStringToArray(values.options);

            const updateQuestion = async () => {
                setErrorMessage('');
                try {
                    await updateQuestionById(values.id, updatedValues);
                    setData(prev => prev.map((item) => {
                        if (item.id === values.id) {
                            values.options = convertOptionStringToArray(values.options);
                            return values;
                        }
                        return item;
                    }));
                    table.setEditingRow(null); //exit editing mode
                } catch (error: any) {
                    if (error?.response?.status === 401) {
                        history(PATH.UNAUTHORIZED);
                    }
                    if (error?.response?.status === 403) {
                        history(PATH.FORBIDDEN);
                    }
                    setErrorMessage(error?.response?.data?.message || 'Something went wrong');
                    console.error(error);
                    return;
                }
                setErrorMessage('');
            };
            await updateQuestion();

        },
        onCreatingRowCancel: () => { setValidationErrors({}); setErrorMessage("") },
        onCreatingRowSave: async ({ table, values }) => {

            const newValidationErrors = validateQuestion(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }
            setValidationErrors({});

            const updatedValues = { ...values };
            updatedValues.options = convertOptionStringToArray(values.options);

            const addQuestionToData = async () => {
                setErrorMessage('');
                try {
                    const addedData = await addQuestion({ ...updatedValues, id: undefined });
                    setData([...data, addedData.data]);
                    table.setCreatingRow(null); //exit creating mode
                } catch (error: any) {
                    if (error?.response?.status === 401) {
                        history(PATH.UNAUTHORIZED);
                    }
                    if (error?.response?.status === 403) {
                        history(PATH.FORBIDDEN);
                    }
                    setErrorMessage(error?.response?.data?.message || 'Something went wrong');
                    console.error(error);
                    return;
                }
                setErrorMessage('');
            };
            await addQuestionToData();

        },

        initialState: { showColumnFilters: false, columnVisibility: { id: false } },

        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,

        state: {
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
        },
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true);
                }}
            >
                Add New Question
            </Button>
        ),
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }: any) => {
            return (
                <>
                    {errorMessage && <ErrorMessage message={errorMessage} />}

                    <DialogTitle variant="h5"> Add Question</DialogTitle>
                    <DialogContent
                        sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        {internalEditComponents}

                    </DialogContent>
                    <DialogActions>
                        <MRT_EditActionButtons variant="text" table={table} row={row} />
                    </DialogActions>
                </>
            )
        },
        renderEditRowDialogContent: ({ internalEditComponents, row, table }) => {
            return (
                <>
                    {errorMessage && <ErrorMessage message={errorMessage} />}

                    <DialogTitle variant="h5"> Edit Question</DialogTitle>
                    <DialogContent
                        sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        {internalEditComponents}
                    </DialogContent>

                    <DialogActions>
                        <MRT_EditActionButtons variant="text" table={table} row={row} />
                    </DialogActions>
                </>
            );
        },
    });

    return <MaterialReactTable table={table} />;
};

export default Question;