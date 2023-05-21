import React from "react";
import Button from "@mui/material/Button";
import { amber } from "@mui/material/colors";
import { hover } from "@testing-library/user-event/dist/hover";

interface SimpleButtonProps {
  mx?: number;
  my?: number;
  width?: string;
  onClick: any;
  name: string;
}

export const SimpleButton: React.FC<SimpleButtonProps> = (props) => {
  const { mx = 0, my = 0, width = "none", onClick, name } = props;
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        width: width,
        mx: mx,
        my: my,
        backgroundColor: amber[700],
        "&:hover": {
          backgroundColor: amber[800],
          //   borderColor: "#0062cc",
        },
      }}
    >
      {name}
    </Button>
  );
};
