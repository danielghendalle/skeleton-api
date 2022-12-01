import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { grey, purple } from "@mui/material/colors";

export const CustomInput = styled(TextField)({
  display: "flex",
  flex: "1",
  "& label.Mui-focused": {
    color: purple[500],
    transition: ".3s ease",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: purple[500],
      transition: ".3s ease",
    },
    "&.Mui-focused fieldset": {
      borderColor: purple[500],
      transition: ".3s ease",
    },

    "& fieldset": {
      borderColor: grey[200],
      transition: ".3s ease",
    },
  },
});
