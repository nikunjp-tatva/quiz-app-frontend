import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

const options = [
  {
    label: "Student",
    value: "user",
  },
  {
    label: "Examiner",
    value: "admin",
  },
];

export const FormInputRadio: React.FC<FormInputProps> = ({ name, control }) => {
  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel
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
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
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
