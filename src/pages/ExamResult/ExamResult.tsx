import React from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import SkippedQuestions from "./SkippedQuestions";
import { COLOR } from "../../config/config";

export default function ExamResult() {
    const location = useLocation();
    const result = location.state?.result;
    return (
        <Box sx={{ p: 4 }}>
            <Card sx={{ minHeight: "40vh" }}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center" pb={1}>
                        {result?.technology?.name} - Exam result
                    </Typography>

                    <Typography sx={{ mb: 1 }} color="text.secondary" textAlign="center">
                        {result?.technology?.description}
                    </Typography>

                    <Divider />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ justifyContent: "flex-start" }} p={4}>
                            {result?.technology?.noOfQuestion !== undefined && (
                                <Typography variant="body1">
                                    {` Total Questions: `}
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        display="inline-block"
                                    >
                                        {result?.technology?.noOfQuestion}
                                    </Typography>
                                </Typography>
                            )}

                            {result?.noOfCorrectQuestions !== undefined && (
                                <Typography variant="body1" pt={1}>
                                    {` Correct Questions: `}
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        display="inline-block"
                                    >
                                        {result?.noOfCorrectQuestions}
                                    </Typography>
                                </Typography>
                            )}

                            {result?.technology?.duration !== undefined && (
                                <Typography variant="body1" pt={1}>
                                    {` Duration: `}
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        display="inline-block"
                                    >
                                        {`${result?.technology?.duration} minutes`}
                                    </Typography>
                                </Typography>
                            )}

                            {result?.spentTime !== undefined && (
                                <Typography variant="body1" pt={1}>
                                    {` Spent Time: `}
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        display="inline-block"
                                    >
                                        {`${Math.floor(result?.spentTime / 60)} Hours ${Math.floor(
                                            result?.spentTime % 60,
                                        )} Minutes ${Math.floor((result?.spentTime % 1) * 60)} Seconds`}
                                    </Typography>
                                </Typography>
                            )}

                            {result?.technology?.cutOff !== undefined && (
                                <Typography variant="body1" pt={1}>
                                    {` Cut-off: `}
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        display="inline-block"
                                    >
                                        {`${result?.technology?.cutOff} Mark`}
                                    </Typography>
                                </Typography>
                            )}

                            {result?.percentage !== undefined && (
                                <Typography variant="body1" pt={1}>
                                    {` Percentage: `}
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        display="inline-block"
                                    >
                                        {`${result?.percentage?.toFixed(2)} %`}
                                    </Typography>
                                </Typography>
                            )}

                            {result?.status && (
                                <Typography variant="body1" pt={1}>
                                    {` Status: `}
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        display="inline-block"
                                        sx={{ color: result?.status === "pass" ? "green" : "red" }}
                                    >
                                        {result?.status === "pass" ? "Passed" : "Failed"}
                                    </Typography>
                                </Typography>
                            )}

                            {result?.dateAppeared && (
                                <Typography variant="body1" pt={1}>
                                    {` Date: `}
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        display="inline-block"
                                    >
                                        {`${new Date(result?.dateAppeared).toLocaleString()}`}
                                    </Typography>
                                </Typography>
                            )}
                        </Box>

                        <Box p={3} justifyContent="flex-end" width={190} pr={6}>
                            <Typography variant="h5" textAlign="center" pb={3}>
                                Score
                            </Typography>
                            <CircularProgressbar
                                value={result?.percentage}
                                text={`${result?.noOfCorrectQuestions}/${result?.technology?.noOfQuestion}`}
                                styles={buildStyles({ pathColor: COLOR.BLUE })}
                            />
                        </Box>
                    </Box>

                    <Typography
                        variant="h5"
                        textAlign="center"
                        sx={{ color: "#454545" }}
                        pt={1}
                    >
                        {result?.skippedQuestions?.length > 0
                            ? "Skipped Questions"
                            : "No Skipped Questions Available"}
                    </Typography>

                    {result?.skippedQuestions?.length > 0 && (
                        <SkippedQuestions questions={result?.skippedQuestions} />
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
