import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./../hooks/useAuth";
import { AlertScackbar } from "./AlertScackbar";
import { SignUpModal } from "./SignUpModal";
import Msg from "../utils/Msg";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const textFieldStyle = {
  width: "200px",
  mt: 2,
  "& label.Mui-focused": {
    color: grey[50],
    borderColor: "white",
  },
  "& label": {
    color: grey[300],
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
};

type FormInput = {
  email: string;
  password: string;
};

export default function Header() {
  const auth = useAuth();
  const [signUpModalOpen, setSignUpModalOpen] = React.useState<boolean>(false);
  const [isSnackbarOpend, setIsSnackbarOpend] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [snackbarType, setSnackbarType] = React.useState<AlertColor>("error");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInput>();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (value: any) => {
    console.log(value.setting);
    switch (value.setting) {
      case "Logout":
        auth.signOut((result) => {
          if (result.isSuccessed) {
            //ログイン成功
            console.log("ログアウト成功");
          } else {
            //TODO: エラー処理
            console.log("ログアウト失敗");
          }
        });

        break;
    }
    setAnchorElUser(null);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpend(false);
  };

  /**
   * サインアップボタン押下イベント
   */
  const handleSignUp = () => {
    setSignUpModalOpen(true);
  };

  /**
   * ログインボタン押下時イベント
   */
  const onSubmit = async () => {
    auth.signIn(getValues("email"), getValues("password"), (result) => {
      if (result.isSuccessed) {
        //ログイン成功
        setMessage(Msg.I101);
        setSnackbarType("success");
        setIsSnackbarOpend(true);
      } else {
        console.log(result);
        //TODO: エラー処理
        if (result.message.includes("AuthError")) {
          //メールアドレス、パスワードが未入力の場合
          setMessage(Msg.E102);
          setSnackbarType("error");
          setIsSnackbarOpend(true);
        } else if (result.message.includes("NotAuthorizedException")) {
          //パスワードを間違えた場合
          if (result.message.includes("Password attempts exceeded")) {
            //パスワードを間違え続けた場合
          }
          setMessage(Msg.E101);

          setSnackbarType("error");
          setIsSnackbarOpend(true);
        } else if (result.message.includes("UserNotFoundException")) {
          //メールアドレスが間違っている場合
          setMessage(Msg.E101);
          setSnackbarType("error");
          setIsSnackbarOpend(true);
        }
      }
    });
  };

  /**
   * サインアップモーダル閉じる
   */
  const handleSignUpModalClose = () => {
    setSignUpModalOpen(false);
  };

  return (
    <React.Fragment>
      {/* <ThemeProvider theme={TextFieldTheme}> */}
      <AppBar position="static">
        {/* <Container maxWidth="xl"> */}
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mx: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TODO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TODO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!auth.isAuthenticated ? (
              <React.Fragment>
                <TextField
                  {...register("email")}
                  size="small"
                  label={"メールアドレス"}
                  sx={textFieldStyle}
                />
                <TextField
                  {...register("password")}
                  size="small"
                  type="password"
                  label={"パスワード"}
                  sx={{ ...textFieldStyle, ml: 1 }}
                />
                <Button
                  sx={{ my: 2, color: "white" }}
                  onClick={handleSubmit(onSubmit)}
                >
                  ログイン
                </Button>
                <Button
                  sx={{ my: 2, mr: 2, color: "white" }}
                  onClick={handleSignUp}
                >
                  ユーザー登録
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Tooltip title="メニューを開く">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 1 }}>
                    <Avatar
                      alt={auth.nickname}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu({ setting })}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            )}
          </Box>
        </Toolbar>

        {/* </Container> */}
      </AppBar>
      {/* モーダル、スナックバー */}
      <SignUpModal open={signUpModalOpen} onClose={handleSignUpModalClose} />

      <AlertScackbar
        isOpend={isSnackbarOpend}
        onClose={handleSnackbarClose}
        message={message}
        type={snackbarType}
      />
      {/* </ThemeProvider> */}
    </React.Fragment>
  );
}
