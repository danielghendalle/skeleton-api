import styled from "@emotion/styled";
import { Link } from "@mui/material";
import { purple } from "@mui/material/colors";

export const CustomLink = styled(Link)({
  cursor: "pointer",
  textDecoration: "none",
  transition: ".3s ease",
  fontFamily: "Roboto, sans-serif",
  wordBreak: "normal",
  "&:hover": {
    color: purple[500],
  },
});
