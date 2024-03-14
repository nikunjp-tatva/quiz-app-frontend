import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputDropdown: React.FC<FormInputProps> = ({
    name,
    control,
    values
}) => {
    const generateSingleOptions = () => {
        return values?.map((option: any) => {
            return (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
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
