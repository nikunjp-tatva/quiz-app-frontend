import { useEffect, useMemo, useState } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import { getUserTechnologies } from "../../services/technology.service";
import { PATH } from "../../config/config";

export type TechnologyType = {
    name: string;
    description?: string;
    noOfQuestion: number;
    duration: number;
    cutOff: number;
    id: string;
};

export default function ExamList() {
    const history = useNavigate();

    const [data, setData] = useState<TechnologyType[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (data.length) {
                setIsRefetching(true);
            }

            try {
                const response = await getUserTechnologies();
                setData(response?.data);
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

    const columns = useMemo<MRT_ColumnDef<TechnologyType>[]>(
        () => [
            {
                accessorKey: "id",
                header: "Id",
                size: 80,
                visibleInShowHideMenu: false,
                enableHiding: false,
            },
            {
                accessorKey: "name",
                header: "Technology Name",
                size: 150,
            },
            {
                accessorKey: "description",
                header: "Description",
                size: 150,
            },
            {
                accessorKey: "noOfQuestion",
                header: "No of Questions",
                size: 20,
            },
            {
                accessorKey: "duration",
                header: "Exam Duration",
                size: 150,
            },
            {
                accessorKey: "cutOff",
                header: "Cut Off Marks",
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
        enablePagination: false,
        enableSorting: false,
        muiTableBodyRowProps: { hover: false },
        enableRowActions: true,
        initialState: { showColumnFilters: false, columnVisibility: { id: false } },

        muiToolbarAlertBannerProps: isError
            ? {
                color: "error",
                children: "Error loading data",
            }
            : undefined,
        renderTopToolbarCustomActions: ({ table }) => (
            <Typography variant="h4" fontWeight={500}>
                Exam List
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
                onClick={() => {
                    history("/exams/" + row.original.id);
                }}
                variant="contained"
                sx={{ textTransform: "none" }}
            >
                Open Exam
            </Button>
        ),
    });

    return <MaterialReactTable table={table} />;
}
