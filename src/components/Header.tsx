import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { SignUpModal } from "./SignUpModal";
import { TextField, ThemeProvider } from "@mui/material";
import { TextFieldTheme } from "./styled/theme";
import { grey } from "@mui/material/colors";
import { useForm, SubmitHandler } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useAuth } from "./../hooks/useAuth";

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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
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
    // switch(value){
    //   case:"Logout"

    //   break;
    // }
    setAnchorElUser(null);
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
    //TODO: サインイン
    try {
      console.log(getValues("email"));
      console.log(getValues("password"));
      auth.signIn(getValues("email"), getValues("password"), (result) => {
        if (result.isSuccessed) {
          //ログイン成功
        } else {
          //TODO: エラー処理
        }
      });
      // const user = await Auth.signIn(getValues("email"), getValues("password"));
      // console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(auth.nickname);

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
              id="menu-appbar"
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
                <Tooltip title="Open settings">
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
      <SignUpModal open={signUpModalOpen} onClose={handleSignUpModalClose} />
      {/* </ThemeProvider> */}
    </React.Fragment>
  );
}
