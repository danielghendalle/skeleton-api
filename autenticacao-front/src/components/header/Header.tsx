import {
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
//@ts-ignore
import styles from "./styles.module.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { grey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "./../CustomButton";
import { destroyCookie } from "nookies";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Header = () => {
  const navigate = useNavigate();

  function Logout() {
    destroyCookie(undefined, "authorization_token");
    destroyCookie(undefined, "refresh_token");

    return navigate("/");
  }

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <Box className={styles.container}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        className={styles.menuButton}
        sx={{
          marginLeft: "0.5rem",
          marginRight: "0.5rem",
        }}
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon className={styles.menuIcon} />
      </IconButton>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box className={styles.header}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            className={styles.closeButton}
            onClick={() => setIsDrawerOpen(false)}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Box className={styles.content}>
          <Typography className={styles.title} marginTop={6} marginLeft={2}>
            PÁGINAS
          </Typography>
          <Stack spacing={2}>
            <Link
              color={grey[100]}
              marginTop={2}
              underline="none"
              className={styles.link}
              marginRight={16}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <Stack spacing={1} direction="row">
                <HomeOutlinedIcon className={styles.icon} />
                <Typography>Início</Typography>
              </Stack>
            </Link>
            <Link
              color={grey[100]}
              underline="none"
              className={styles.link}
              onClick={() => {
                navigate("/users");
              }}
            >
              <Stack spacing={1} direction="row">
                <PersonOutlinedIcon />
                <Typography>Usuários</Typography>
              </Stack>
            </Link>
            <Button
              className={styles.logoutButton}
              onClick={Logout}
              color="error"
              startIcon={<ExitToAppIcon />}
            >
              Sair
            </Button>
          </Stack>
        </Box>
      </Drawer>
      <Typography
        variant="h4"
        className={styles.logo}
        sx={{ fontWeight: "bold",
              fontFamily: "Roboto, sans-serif" }}
      >
        Finances
      </Typography>
    </Box>
  );
};

export default Header;
