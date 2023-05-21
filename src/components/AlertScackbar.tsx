import React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface AlertScackbarProps {
  isOpend: boolean;
  onClose: any;
  message: string;
  type?: AlertColor;
}

export const AlertScackbar: React.FC<AlertScackbarProps> = (props) => {
  const { isOpend, onClose, message, type = "error" } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpend}
      onClose={onClose}
      autoHideDuration={4000}
    >
      <Alert severity={type}>
        {message}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  );
};
