import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';

import { COLOR } from '../../config/config';

type SkippedQuestionType = {
    questionText: string;
    options: string[];
    selectedOption: string;
    isCorrect: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: COLOR.BLUE,
        color: theme.palette.common.white,
        fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default function SkippedQuestions({ questions }: Readonly<{ questions: SkippedQuestionType[] }>) {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
            <TableContainer sx={{ maxHeight: 300 }} >
                <Table sx={{ minWidth: 650 }} stickyHeader >
                    <TableHead >
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Question Text</StyledTableCell>
                            <StyledTableCell>Options</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map((row, index) => (
                            <TableRow
                                key={row.questionText}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.questionText}
                                </TableCell>
                                <TableCell>{row.options?.join(", ")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
