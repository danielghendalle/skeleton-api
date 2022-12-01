import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
//@ts-ignore
import styles from "./styles.module.scss";
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import { grey } from "@mui/material/colors";
import { CustomLink } from "../../components/CustomLink";
import { useForm } from "react-hook-form";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/api";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    try {
      signIn(data.username, data.password);
      return setTimeout(function () {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const redirectToLoginRegistration = () => {
    navigate("/loginRegistration");
  };

  return (
    <Box className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.containerHeader}>
          <Typography
            className={styles.typography}
            variant="h4"
            color={grey[100]}
            sx={{ fontWeight: "bold" }}
          >
            Acessar
          </Typography>
        </Box>
        <Stack spacing={2}>
          <CustomInput
            name="username"
            label="E-mail"
            type="email"
            {...register("username", {
              required: "O campo está incorreto verifique!",
            })}
            error={!!errors?.username}
            helperText={
              errors.username ? errors.username.message.toString() : null
            }
          />

          <CustomInput
            name="password"
            label="Senha"
            type="password"
            {...register("password", {
              required: "O campo está incorreto verifique!",
            })}
            error={!!errors?.password}
            helperText={
              errors.password ? errors.password.message.toString() : null
            }
          />

          <CustomButton
            variant="contained"
            size="large"
            endIcon={<LockOpenIcon />}
            loading={loading}
            loadingPosition="end"
            type="submit"
          >
            Login
          </CustomButton>
        </Stack>
        <Box className={styles.linkBox}>
          <Stack spacing={5} direction="row">
            <CustomLink
              className={styles.link}
              color={grey[100]}
              onClick={redirectToLoginRegistration}
            >
              Inscreva-se
            </CustomLink>
            <CustomLink className={styles.link} color={grey[100]}>
              Mudar a senha ?
            </CustomLink>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
