import React from "react";
import { Controller } from "react-hook-form";

import { FormInputProps } from "./FormInputProps";
import CustomTextField from "../CustomTextField";

export const FormInputText = ({ name, control, type }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <CustomTextField
          id={name}
          type={type}
          variant="outlined"
          fullWidth
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          size="small"
        />
      )}
    />
  );
};
