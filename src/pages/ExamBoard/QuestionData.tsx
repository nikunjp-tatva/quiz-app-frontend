import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import { alphabetOption } from "../../config/config";

type QuestionDetails = {
    options: string[];
    serialNo: string;
    questionText: string;
    selectedOption: string;
};

export default function QuestionData({
    questionDetails,
    onOptionSelect,
}: Readonly<{ questionDetails: QuestionDetails; onOptionSelect: any }>) {
    return (
        <Box p={4}>
            <Typography variant="body1" fontWeight="600">
                Question {questionDetails?.serialNo}
            </Typography>

            <Divider sx={{ paddingTop: 1 }} />
            <Typography variant="body2" pt={2} fontSize="1.09rem">
                {questionDetails?.questionText}
            </Typography>

            <FormControl sx={{ paddingTop: 1 }}>
                <RadioGroup
                    aria-labelledby="options-radio-buttons-group-label"
                    name={`selectedOption-${questionDetails?.serialNo}`}
                    onClick={onOptionSelect}
                    value={questionDetails?.selectedOption || ""}
                >
                    {questionDetails?.options.map((option: string, index: number) => (
                        <FormControlLabel
                            key={`selectedOption-${questionDetails?.serialNo}-${option}`}
                            value={option}
                            control={<Radio />}
                            label={`${alphabetOption[index]}. ${option}`}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    );
}
