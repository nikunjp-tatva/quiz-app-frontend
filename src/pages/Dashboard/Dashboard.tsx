import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';

import { getAllExamSummary } from '../../services/exam.service';
import { PATH } from '../../config/config';

export type ExamResultType = {
    user: string;
    technology: string;
    completeTime: number;
    score: number;
    status: string;
    dateAppeared: string;
};

const Dashboard = () => {
    const history = useNavigate();

    const [data, setData] = useState<ExamResultType[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (data.length) {
                setIsRefetching(true);
            }

            try {
                const response = await getAllExamSummary();

                const resultData = response?.data?.results?.map((result: { technology: { name: any; }; user: { name: any; }; score: any; completeTime: any; dateAppeared: any; }) => ({
                    technology: result?.technology?.name,
                    user: result?.user?.name,
                    score: result?.score,
                    status: result?.score,
                    completeTime: result?.completeTime,
                    dateAppeared: result?.dateAppeared,
                }));

                setData(resultData);
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
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = useMemo<MRT_ColumnDef<ExamResultType>[]>(
        () => [
            {
                accessorKey: 'user',
                header: 'User Name',
                size: 150,
            },
            {
                accessorKey: 'technology',
                header: 'Technology Name',
                size: 150,
            },
            {
                accessorKey: 'score',
                header: 'Score',
                size: 20,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 20,
            },
            {
                accessorKey: 'completeTime',
                header: 'Total Spent Time',
                size: 150,
            },
            {
                accessorKey: 'dateAppeared',
                header: 'Exam Date',
                size: 150,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableColumnFilterModes: false,
        enableColumnFilters: false,
        enableRowNumbers: true,
        enableColumnActions: false,
        muiTableBodyRowProps: { hover: false },

        initialState: { showColumnFilters: false, columnVisibility: { id: false } },

        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        renderTopToolbarCustomActions: () => (
            <Typography variant='h4' fontWeight={500}>Exam Summary</Typography>
        ),
        state: {
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
        },
    });

    return <MaterialReactTable table={table} />;
};

export default Dashboard;