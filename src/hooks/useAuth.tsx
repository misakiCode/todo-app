import React, { useEffect, useState, useContext, createContext } from "react";
import { Auth } from "aws-amplify";

interface UseAuth {
  isLoading: boolean;
  isAuthenticated: boolean;
  email: string;
  nickname: string;
  signUp: (
    email: string,
    password: string,
    callback: (r: Result) => void
  ) => void;
  confirmSignUp: (
    verificationCode: string,
    callback: (r: Result) => void
  ) => void;
  signIn: (
    email: string,
    password: string,
    callback: (r: Result) => void
  ) => void;
  signOut: (callback: (r: Result) => void) => void;
}

interface Result {
  isSuccessed: boolean;
  message: string;
}

const authContext = createContext({} as UseAuth);

type Props = {
  children: React.ReactNode;
};

export const ProvideAuth: React.FC<Props> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    // 最初の認証確認
    Auth.currentAuthenticatedUser()
      .then((data) => {
        console.log(data);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  const signUp = (
    email: string,
    password: string,
    callback: (r: Result) => void
  ) => {
    Auth.signUp({
      username: email,
      password: password,
    })
      .then(() => {
        setEmail(email);
        setPassword(password);
        callback({ isSuccessed: true, message: "" });
      })
      .catch(() => {
        callback({
          isSuccessed: false,
          message: "認証に失敗しました。",
        });
      });
  };

  const confirmSignUp = (
    verificationCode: string,
    callback: (r: Result) => void
  ) => {
    Auth.confirmSignUp(email, verificationCode)
      .then(() => {
        signIn(email, password, callback);
        setPassword("");
      })
      .catch(() => {
        setPassword("");
        callback({
          isSuccessed: false,
          message: "認証に失敗しました。",
        });
      });
  };

  const signIn = (
    email: string,
    password: string,
    callback: (r: Result) => void
  ) => {
    Auth.signIn(email, password)
      .then((data) => {
        console.log(data);
        setEmail(email);
        setNickname(data.attributes.nickname);
        setIsAuthenticated(true);
        callback({ isSuccessed: true, message: "" });
      })
      .catch((err) => {
        //エラーハンドリング
        console.log(err);
        callback({
          isSuccessed: false,
          message: err.name,
        });
      });
  };

  const signOut = (callback: (r: Result) => void) => {
    Auth.signOut()
      .then(() => {
        setEmail("");
        setIsAuthenticated(false);
        callback({ isSuccessed: true, message: "" });
      })
      .catch(() => {
        callback({
          isSuccessed: false,
          message: "ログアウトに失敗しました。",
        });
      });
  };

  return {
    isLoading,
    isAuthenticated,
    email,
    nickname,
    signUp,
    confirmSignUp,
    signIn,
    signOut,
  };
};
