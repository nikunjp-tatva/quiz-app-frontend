import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_EditActionButtons,
} from 'material-react-table';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from "react-router-dom";

import { validateTechnology } from './technologyValidation';
import { addTechnology, getTechnologies, updateTechnologyById } from '../../services/technology.service';
import ErrorMessage from '../../common/ErrorMessage';

export type TechnologyType = {
    id: string;
    name: string;
    description?: string;
    noOfQuestion: number;
    duration: number;
    cutOff: number;
};

const Technology = () => {
    const history = useNavigate();

    //data and fetching state
    const [data, setData] = useState<TechnologyType[]>([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }

            try {
                const response = await getTechnologies();
                setData(response?.data?.results);
            } catch (error: any) {
                if (error?.response?.status === 401) {
                    history('/auth/login');
                }
                if (error?.response?.status === 403) {
                    history('/auth/login');
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
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
                header: 'Technology Name',
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
                    onChange: () => setErrorMessage(""),
                },
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 150,
                muiEditTextFieldProps: {
                    onChange: () => setErrorMessage(""),
                },
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
                    onChange: () => setErrorMessage(""),
                },
            },
            {
                accessorKey: 'duration',
                header: 'Duration (In Min.) ',
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
                    onChange: () => setErrorMessage(""),
                },
            },
            {
                accessorKey: 'cutOff',
                header: 'Cut-Off Marks (Numbers only)',
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
                    onChange: () => setErrorMessage(""),
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
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableColumnFilterModes: false,
        enableColumnFilters: false,
        enableRowNumbers: true,
        enableColumnActions: false,
        // enablePagination: false,
        // enableSorting: false,
        muiTableBodyRowProps: { hover: false },

        onEditingRowCancel: () => { setValidationErrors({}); setErrorMessage("") },
        onEditingRowSave: async ({ table, values }) => {
            const newValidationErrors = validateTechnology(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }

            setValidationErrors({});

            const updateTechnologyDetails = async () => {
                setErrorMessage('');
                try {
                    await updateTechnologyById(values.id, values);
                    setData(prev => prev.map((item) => {
                        if (item.id === values.id) {
                            return values;
                        }
                        return item;
                    }))
                    table.setEditingRow(null); //exit editing mode
                } catch (error: any) {
                    if (error?.response?.status === 401) {
                        history('/auth/login');
                    }
                    if (error?.response?.status === 403) {
                        history('/auth/login');
                    }
                    setErrorMessage(error?.response?.data?.message || 'Something went wrong');
                    console.error(error);
                    return;
                }
                setErrorMessage('');
            };
            await updateTechnologyDetails();
        },
        onCreatingRowCancel: () => { setValidationErrors({}); setErrorMessage("") },
        onCreatingRowSave: async ({ table, values }) => {

            const newValidationErrors = validateTechnology(values);
            if (Object.values(newValidationErrors).some((error) => error)) {
                setValidationErrors(newValidationErrors);
                return;
            }
            setValidationErrors({});

            const addTechnologyDetails = async () => {
                setErrorMessage('');
                try {
                    const addedData = await addTechnology(values);
                    setData([...data, addedData.data]);

                    table.setCreatingRow(null); //exit creating mode
                } catch (error: any) {
                    if (error?.response?.status === 401) {
                        history('/auth/login');
                    }
                    if (error?.response?.status === 403) {
                        history('/auth/login');
                    }
                    setErrorMessage(error?.response?.data?.message || 'Something went wrong');
                    console.error(error);
                    return;
                }
                setErrorMessage('');
            };
            await addTechnologyDetails();
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
                Add Technology
            </Button>
        ),
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                {errorMessage && <ErrorMessage message={errorMessage} />}

                <DialogTitle variant="h5"> Add Technology</DialogTitle>
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
        renderEditRowDialogContent: ({ internalEditComponents, row, table }) => {
            return (
                <>
                    {errorMessage && <ErrorMessage message={errorMessage} />}

                    <DialogTitle variant="h5"> Edit Technology</DialogTitle>
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

export default Technology;