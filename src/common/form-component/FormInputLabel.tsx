import { Typography } from "@mui/material";

export const FormInputLabel = ({ label }: { label: string }) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    component="label"
    htmlFor="email"
    mb="5px"
    mt="25px"
  >
    {label}
  </Typography>
);
