import { Alert, Box, IconButton, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WestIcon from "@mui/icons-material/West";
//@ts-ignore
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../services/api";

const LoginRegistration = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    userRegister(data.username, data.password);
  };

  function handleReturn() {
    return navigate("/");
  }

  return (
    <Box className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.containerHeader}>
          <Typography
            className={styles.typography}
            variant="h4"
            color={grey[200]}
          >
            Cadastro
          </Typography>
        </Box>
        <Stack spacing={2}>
          <CustomInput
            label="Email"
            name="username"
            type="email"
            {...register("username", {
              required: "O campo é obrigatório !",
            })}
            error={!!errors?.username}
            helperText={
              errors.username ? errors.username.message.toString() : null
            }
          />

          <CustomInput
            label="Senha"
            name="password"
            type="password"
            variant="outlined"
            {...register("password", {
              required: "O campo é obrigatório !",
            })}
            error={!!errors?.password}
            helperText={
              errors.password ? errors.password.message.toString() : null
            }
          />

          <CustomButton
            variant="contained"
            size="large"
            type="submit"
            endIcon={<HowToRegIcon />}
          >
            Cadastrar
          </CustomButton>
        </Stack>
        <IconButton
          className={styles.returnButton}
          sx={{
            marginTop: "1rem",
          }}
          onClick={handleReturn}
        >
          <WestIcon></WestIcon>
        </IconButton>
      </form>
    </Box>
  );
};

export default LoginRegistration;
