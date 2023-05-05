import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { TextFieldTheme } from "./styled/theme";
import { SimpleButton } from "./button/SimpleButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { Auth } from "aws-amplify";

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

type FormInput = {
  name: string;
  password: string;
  email: string;
  code: string;
};

export const SignUpModal: React.FC<SignUpModalProps> = (props) => {
  const { open, onClose } = props;
  const [isCodeSent, setIsCodeSent] = React.useState<boolean>(false);
  const [formParams, setFormParams] = React.useState<FormInput>({
    name: "",
    password: "",
    email: "",
    code: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();
  const handleOpen = () => console.log("open");

  const handleClose = () => onClose(false);
  //TODO: 入力されている文字列をクリアする

  /**
   * 送信ボタン押下イベント
   * @param data 入力されたデータ
   */
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(data);
    try {
      // サインアップ関数呼び出し
      const signUpParams = {
        username: data.email,
        password: data.password,
        attributes: {
          email: data.email,
          nickname: data.name,
        },
        autoSignIn: {
          enabled: true,
        },
      };
      const signUpResult = await Auth.signUp(signUpParams);
      console.log(signUpResult);
      setFormParams({
        name: data.name,
        email: data.email,
        password: data.password,
        code: "",
      });
      setValue("email", "");
      setValue("name", "");
      setValue("password", "");
      setIsCodeSent(true);
    } catch (err: any) {
      console.log(err);
    }
  };

  /**
   * ユーザー登録ボタン押下イベント
   */
  const handleCodeSubmit = async () => {
    try {
      const codeResponse = await Auth.confirmSignUp(
        formParams.email,
        getValues("code")
      );
      console.log(codeResponse);

      const user = await Auth.signIn(formParams.email, getValues("password"));
      console.log(user);
      const a = await Auth.currentAuthenticatedUser();
      console.log(a);
      handleClose();
    } catch (err: any) {
      console.log(err);
    }
  };

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
          {!isCodeSent ? (
            <React.Fragment>
              <Typography sx={{ mt: 2 }}>名前</Typography>
              <TextField {...register("name")} sx={{ display: "flex" }} />
              <Typography sx={{ mt: 2 }}>メールアドレス</Typography>
              <TextField {...register("email")} sx={{ display: "flex" }} />
              <Typography sx={{ mt: 2 }}>パスワード</Typography>
              <TextField {...register("password")} sx={{ display: "flex" }} />
              <Box sx={{ textAlign: "center" }}>
                <SimpleButton
                  name={"送信"}
                  my={1}
                  width="100%"
                  onClick={handleSubmit(onSubmit)}
                />
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2 }}>確認コード</Typography>
              <TextField {...register("code")} sx={{ display: "flex" }} />
              <Box sx={{ textAlign: "center" }}>
                <SimpleButton
                  name={"ユーザー登録"}
                  my={1}
                  width="100%"
                  onClick={handleCodeSubmit}
                />
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Modal>
    </ThemeProvider>
  );
};
