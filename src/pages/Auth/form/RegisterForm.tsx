import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInputText } from "../../../common/form-component/FormInputText";
import { FormInputRadio } from "../../../common/form-component/FormInputRadio";
import { FormInputDropdown } from "../../../common/form-component/FormInputDropdown";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  role: string;
  selectedTechnology: string[];
}

const defaultValues = {
  name: "",
  email: "",
  password: "",
  role: "user",
  selectedTechnology: [],
};

const RegisterForm = () => {
  const { handleSubmit, reset, control, setValue, watch } = useForm<IFormInput>(
    {
      defaultValues: defaultValues,
    },
  );

  const role = watch("role");
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    // <form onSubmit={(data)=>onSubmit(data)}>
    <Box>
      <Stack mb={3}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="name"
          mb="5px"
        >
          Name
        </Typography>
        <FormInputText name="name" control={control} type="text" />

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

        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="role"
          mb="5px"
          mt="25px"
        >
          Role
        </Typography>
        <FormInputRadio name="role" control={control} />

        {role === "user" && (
          <>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="role"
              mb="5px"
              mt="25px"
            >
              Technologies
            </Typography>
            <FormInputDropdown name="technologies" control={control} />
          </>
        )}
      </Stack>
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        size="small"
        fullWidth
      >
        Sign Up
      </Button>
      <Button onClick={() => reset()} variant="outlined" size="small" fullWidth>
        Reset
      </Button>
      {/* <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/auth/login"> */}
      {/* Sign Up */}
      {/* </Button> */}
    </Box>
    // </form>
  );
};

export default RegisterForm;
