import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInputText } from "../../../common/form-component/FormInputText";

interface IFormInput {
  email: string;
  password: string;
}

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { handleSubmit, reset, control, setValue, watch } = useForm<IFormInput>(
    {
      defaultValues: defaultValues,
    },
  );

  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <Box>
      <Stack mb={3}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="email"
          mb="5px"
          mt="25px"
        >
          Email Address
        </Typography>
        <FormInputText name="email" control={control} type="email" />

        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
          mt="25px"
        >
          Password
        </Typography>
        <FormInputText name="password" control={control} type="password" />
      </Stack>
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        size="small"
        fullWidth
      >
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;
