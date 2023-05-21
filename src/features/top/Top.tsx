import { Typography } from "@mui/material";
import React from "react";
import Header from "../../components/Header";

interface TopProps {}

export const Top: React.FC<TopProps> = ({}) => {
  return (
    <React.Fragment>
      <Header />
      <Typography>TOPページ</Typography>
    </React.Fragment>
  );
};
