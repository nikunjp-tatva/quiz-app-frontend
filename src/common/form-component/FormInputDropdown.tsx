import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

const options = [
    {
        label: "ReactJS",
        value: "react",
    },
    {
        label: "NodeJS",
        value: "nodejs",
    },
];

export const FormInputDropdown: React.FC<FormInputProps> = ({
    name,
    control,
}) => {
    const generateSingleOptions = () => {
        return options.map((option: any) => {
            return (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            );
        });
    };

    return (
        <FormControl size={"small"}>
            <Controller
                render={({ field: { onChange, value } }) => (
                    <Select onChange={onChange} value={value} multiple>
                        {generateSingleOptions()}
                    </Select>
                )}
                control={control}
                name={name}
            />
        </FormControl>
    );
};
