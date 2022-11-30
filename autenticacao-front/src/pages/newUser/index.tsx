//@ts-ignore
import styles from "./styles.module.scss";
import { Box } from "@mui/material";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import WestIcon from '@mui/icons-material/West';
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userRegister } from "../../services/api";

const NewUser = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleAdd(data) {
    setLoading(true);
    setTimeout(function () {
      userRegister(data.username, data.password);
      setLoading(false);
    }, 2000);
  }

  return (
    <Box>
      <Header />
      <Box className={styles.container}>
        <Box className={styles.title}>
          <Typography variant="h4" className={styles.typography} sx={{ fontWeight: "bold" }}>
            Novo Usuário
          </Typography>
        </Box>
        <form className={styles.form} onSubmit={handleSubmit(handleAdd)}>
          <Box className={styles.inputContainer}>
            <CustomInput
              id="email"
              type="email"
              label="Email"
              {...register("username")}
            />
            <CustomInput
              id="password"
              type="password"
              label="Senha"
              {...register("password")}
            />
          </Box>
          <Box className={styles.buttonContainer}>
            <CustomButton
              className={styles.button}
              endIcon={<PersonAddOutlinedIcon />}
              loading={loading}
              loadingPosition="end"
              type="submit"
            >
              Adicionar
            </CustomButton>
            <CustomButton
              className={styles.button}
              endIcon={<WestIcon />}
              onClick={() => navigate("/users")}
            >
              Voltar
            </CustomButton>
          </Box>
        </form>
      </Box>
      <Footer />
    </Box>
  );
};

export default NewUser;
