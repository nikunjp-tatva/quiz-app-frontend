import { useEffect, useMemo, useState } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import {
    getAllExamSummary,
    getExamResultDetails,
} from "../../services/exam.service";
import { PATH } from "../../config/config";
import { spentTimeDateString } from "../StudentDashboard/StudentDashboard";

export type ExamResultType = {
    id: string;
    user: { name: string };
    technology: { name: string };
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

    const handleExamResultButtonClick = async (examResultId: string) => {
        const response = await getExamResultDetails(examResultId);
        history(PATH.EXAM_RESULT, { state: { result: response.data } });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (data.length) {
                setIsRefetching(true);
            }

            try {
                const response = await getAllExamSummary();

                const resultData = response?.data?.results?.map(
                    (result: ExamResultType) => ({
                        id: result?.id,
                        technology: result?.technology?.name,
                        user: result?.user?.name,
                        score: result?.score,
                        status: result?.status === "pass" ? "Pass" : "Failed",
                        completeTime: result?.completeTime,
                        dateAppeared: result?.dateAppeared,
                    }),
                );

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
                accessorKey: "id",
                header: "Id",
                visibleInShowHideMenu: false,
                enableHiding: false,
                size: 40,
            },
            {
                accessorKey: "user",
                header: "User Name",
                size: 150,
            },
            {
                accessorKey: "technology",
                header: "Technology Name",
                size: 150,
            },
            {
                accessorKey: "score",
                header: "Score",
                size: 20,
            },
            {
                accessorKey: "status",
                header: "Status",
                size: 20,
                Cell: ({ renderedCellValue }) => (
                    <Typography
                        sx={{
                            color: renderedCellValue === "Pass" ? "green" : "red",
                            fontWeight: 600,
                        }}
                    >
                        {renderedCellValue}
                    </Typography>
                ),
            },
            {
                accessorFn: (row) => spentTimeDateString(row.completeTime),
                header: "Total Spent Time",
                size: 150,
            },
            {
                accessorFn: (row) => new Date(row.dateAppeared).toLocaleString(),
                header: "Exam Date",
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
        enableRowActions: true,
        initialState: { showColumnFilters: false, columnVisibility: { id: false } },

        muiToolbarAlertBannerProps: isError
            ? {
                color: "error",
                children: "Error loading data",
            }
            : undefined,
        renderTopToolbarCustomActions: () => (
            <Typography variant="h4" fontWeight={500}>
                Exam Summary
            </Typography>
        ),
        state: {
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
        },
        positionActionsColumn: "last",
        renderRowActions: ({ row }) => (
            <Button
                color="primary"
                size="small"
                onClick={() => handleExamResultButtonClick(row.original.id)}
                variant="contained"
                sx={{ textTransform: "none" }}
            >
                Exam Result
            </Button>
        ),
    });

    return <MaterialReactTable table={table} />;
};

export default Dashboard;
