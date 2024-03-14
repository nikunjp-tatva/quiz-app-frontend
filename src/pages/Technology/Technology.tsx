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
import { validateTechnology } from './technologyValidation';

export type TechnologyType = {
    id: string;
    name: string;
    description?: string;
    noOfQuestion: number;
    duration: number;
    cutOff: number;
};

type TechnologyApiResponse = {
    data: Array<TechnologyType>;
    meta: {
        totalRowCount: number;
    };
};

const iniData: TechnologyType[] = [
    {
        id: '1',
        name: "React JS",
        description: 'React JS exam',
        noOfQuestion: 10,
        duration: 20,
        cutOff: 6,
    },
    {
        id: '2',
        name: "Node JS",
        description: 'Node JS exam',
        noOfQuestion: 20,
        duration: 30,
        cutOff: 14,
    },
    {
        id: '3',
        name: "NestJS",
        description: 'NestJS exam',
        noOfQuestion: 30,
        duration: 30,
        cutOff: 20,
    },
];

const Technology = () => {

    //data and fetching state
    const [data, setData] = useState<TechnologyType[]>(iniData);
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
                const json = (await response.json()) as TechnologyApiResponse;
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

    const columns = useMemo<MRT_ColumnDef<TechnologyType>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                visibleInShowHideMenu: false,
                enableHiding: false,
                size: 80,
                Edit: () => null,
            },
            {
                accessorKey: 'name',
                header: 'Name',
                size: 150,
                enableHiding: false,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.name,
                    helperText: validationErrors?.name,

                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                },
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 150,
            },
            {
                accessorKey: 'noOfQuestion',
                header: 'Total Questions (Numbers only)',
                size: 150,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.noOfQuestion,
                    helperText: validationErrors?.noOfQuestion,

                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            noOfQuestion: undefined,
                        }),
                },
            },
            {
                accessorKey: 'duration',
                header: 'Duration (In Min) ',
                size: 150,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.duration,
                    helperText: validationErrors?.duration,

                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            duration: undefined,
                        }),
                },
            },
            {
                accessorKey: 'cutOff',
                header: (<InfoTextIcon headerName="Cut off (Numbers only)" titleText="The value should be less than the total question." />),
                size: 150,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.cutOff,
                    helperText: validationErrors?.cutOff,

                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            cutOff: undefined,
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
            const newValidationErrors = validateTechnology(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }

            setValidationErrors({});

            table.setEditingRow(null); //exit editing mode
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: ({ table, values }) => {

            const newValidationErrors = validateTechnology(values);
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
                Add Technology
            </Button>
        ),
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h4" textAlign="center"> Add Technology</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {internalEditComponents}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
    });

    return <MaterialReactTable table={table} />;
};

export default Technology;