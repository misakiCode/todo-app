import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { TextFieldTheme } from "./styled/theme";
import { SimpleButton } from "./button/SimpleButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
type SignUpModalProps = {
  open: boolean;
  onClose?: any;
};

export const SignUpModal: React.FC<SignUpModalProps> = (props) => {
  const { open, onClose } = props;
  const handleOpen = () => console.log("open");

  const handleClose = () => onClose(false);
  //TODO: 入力されている文字列をクリアする

  return (
    <ThemeProvider theme={TextFieldTheme}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            アカウントを作成する
          </Typography>
          <Typography sx={{ mt: 2 }}>名前</Typography>
          <TextField name="name" sx={{ display: "flex" }} />
          <Typography sx={{ mt: 2 }}>メールアドレス</Typography>
          <TextField name="email" sx={{ display: "flex" }} />
          <Typography sx={{ mt: 2 }}>パスワード</Typography>
          <TextField name="password" sx={{ display: "flex" }} />
          <Box sx={{ textAlign: "center" }}>
            <SimpleButton my={1} width="100%" />
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};
