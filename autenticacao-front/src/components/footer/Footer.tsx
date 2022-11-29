import { Box, Link, Stack, Typography } from "@mui/material";
//@ts-ignore
import styles from "./styles.module.scss";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { grey } from "@mui/material/colors";
import { ReactNode } from "react";


const Footer = () => {
  return (
    <Box className={styles.container}>
      <Link
        className={styles.link}
        color={grey[100]}
        href="https://github.com/danielghendalle"
      >
        <Stack spacing={1} direction="row">
          <CopyrightIcon fontSize="medium"/>
          <Typography className={styles.tipography}>Developed by: Daniel Ghendalle</Typography>
        </Stack>
      </Link>
    </Box>
  );
};

export default Footer;
