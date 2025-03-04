import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Alert,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useCustomer } from "../hooks/useCustomer";
import { CUSTOMER_ID } from "../constants";

interface FormInputs {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

const PersonalInformation: React.FC = () => {
  const { customer, updateCustomer, updateCustomerResult, loading } =
    useCustomer(CUSTOMER_ID);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name || "",
        surname: customer.surname || "",
        email: customer.email || "",
        phone: customer.phone || "",
      });
    }
  }, [customer, reset]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await updateCustomer({
        variables: {
          data,
          where: { id: CUSTOMER_ID },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !customer) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Osobní údaje
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        Údaje se použijí v příštích rezervacích, které se tím zrychlí.
      </Alert>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Jméno"
          fullWidth
          margin="normal"
          {...register("name", { required: "Jméno je povinné" })}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />
        <TextField
          label="Příjmení"
          fullWidth
          margin="normal"
          {...register("surname", { required: "Příjmení je povinné" })}
          error={Boolean(errors.surname)}
          helperText={errors.surname?.message}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "Email je povinný",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Neplatný email",
            },
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <TextField
          label="Telefon"
          fullWidth
          margin="normal"
          {...register("phone", { required: "Telefon je povinný" })}
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={updateCustomerResult?.loading}
        >
          {updateCustomerResult?.loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Uložit"
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default PersonalInformation;
