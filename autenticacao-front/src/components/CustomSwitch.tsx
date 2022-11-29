import styled from "@emotion/styled";
import { alpha, Switch } from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: purple[600],
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: purple[600],
  },
}));

export default CustomSwitch;
