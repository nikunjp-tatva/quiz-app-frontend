import React from "react";
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";

import { FormInputProps } from "./FormInputProps";

export const FormInputRadio: React.FC<FormInputProps> = ({
    name,
    control,
    options,
}) => {
    const generateRadioOptions = () => {
        return options?.map((singleOption) => (
            <FormControlLabel
                key={singleOption.label}
                value={singleOption.value}
                label={singleOption.label}
                control={<Radio />}
            />
        ));
    };

    return (
        <FormControl component="fieldset">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <RadioGroup
                        value={value}
                        onChange={onChange}
                        sx={{ display: "inline" }}
                    >
                        {generateRadioOptions()}
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
};
