import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_PaginationState,
    type MRT_SortingState,
    MRT_EditActionButtons,
} from 'material-react-table';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InfoTextIcon from '../../common/InfoTextIcon';
import {
    convertOptionStringToArray,
    convertOptionsArrayToString,
    validateQuestion
} from './questionValidtion';

export type QuestionType = {
    id: string;
    technology: string;
    questionText: string;
    options: string[];
    correctOption: string;
};

type QuestionApiResponse = {
    data: Array<QuestionType>;
    meta: {
        totalRowCount: number;
    };
};

const iniData: QuestionType[] = [
    {
        id: '1',
        technology: "React JS",
        questionText: "React JS is library",
        options: ["Yes", "No"],
        correctOption: "Yes",
    },
    {
        id: '2',
        technology: "Nest JS",
        questionText: "Nest JS is library",
        options: ["Yes", "No"],
        correctOption: "No",
    },
    {
        id: '3',
        technology: "Node JS",
        questionText: "Node JS is Framework",
        options: ["Yes", "No"],
        correctOption: "Yes",
    },
];

const Question = () => {

    //data and fetching state
    const [data, setData] = useState<QuestionType[]>(iniData);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    //table state
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }

            const url = new URL(
                '/api/data',
                'http://localhost:3000',
            );
            url.searchParams.set(
                'start',
                `${pagination.pageIndex * pagination.pageSize}`,
            );
            url.searchParams.set('size', `${pagination.pageSize}`);
            url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
            url.searchParams.set('globalFilter', globalFilter ?? '');
            url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

            try {
                const response = await fetch(url.href);
                const json = (await response.json()) as QuestionApiResponse;
                setData(json.data);
                setRowCount(json.meta.totalRowCount);
            } catch (error) {
                setIsError(true);
                setIsLoading(false);
                console.error(error);
                return;
            }
            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
        };
        // fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        columnFilters, //re-fetch when column filters change
        globalFilter, //re-fetch when global filter changes
        pagination.pageIndex, //re-fetch when page index changes
        pagination.pageSize, //re-fetch when page size changes
        sorting, //re-fetch when sorting changes
    ]);

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
                accessorKey: 'technology',
                header: 'Technology',
                editVariant: 'select',
                editSelectOptions: ["React JS", "Node JS", "Nest JS"],
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
                },
            },
            {
                accessorKey: 'options',
                header: (<InfoTextIcon headerName="Options" titleText='Enter in string with "," separated. Eg. (Yes, No, All)' />),
                accessorFn: (row) => {
                    if (typeof row?.options === 'object' && row.options.length > 0) {
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
                },
            },
            {
                accessorKey: 'correctOption',
                header: (<InfoTextIcon headerName="Correct Option" titleText='Enter string that exists in options' />),
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
                },
            },
        ],
        [validationErrors],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableEditing: true,
        editDisplayMode: 'modal',
        createDisplayMode: 'modal',
        positionActionsColumn: 'last',

        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: ({ table, values }) => {

            const newValidationErrors = validateQuestion(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }

            setValidationErrors({});

            setData(prev => prev.map((item) => {
                if (item.id === values.id) {
                    values.options = convertOptionStringToArray(values.options);
                    return values;
                }
                return item;
            }))
            table.setEditingRow(null); //exit editing mode

        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: ({ table, values }) => {

            const newValidationErrors = validateQuestion(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }
            setValidationErrors({});

            setData([...data, values]);

            table.setCreatingRow(null); //exit creating mode
        },

        initialState: { showColumnFilters: false, columnVisibility: { id: false } },
        // manualFiltering: true,
        // manualPagination: true,
        // manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        // onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        rowCount,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
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
            // console.log({ row: row.getValue('options') });
            return (
                <>
                    <DialogTitle variant="h4" textAlign="center"> Add Question</DialogTitle>
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
                    <DialogTitle variant="h4" textAlign="center"> Edit Question</DialogTitle>
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