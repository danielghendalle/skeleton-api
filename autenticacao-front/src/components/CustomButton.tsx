import styled from "@emotion/styled";
import LoadingButton from "@mui/lab/LoadingButton";
import { grey, purple } from "@mui/material/colors";

export const CustomButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: purple[500],
  display: "flex",
  flex: "1",
  color: grey[100],
  "&:hover": {
    backgroundColor: purple[700],
    transition: ".7s ease",
  },
}));
