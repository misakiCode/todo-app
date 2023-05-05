import { TextField, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import { API, graphqlOperation } from "aws-amplify";
import { queryChatdataByServiceid } from "./../../graphql/queries";
import { putChatdata } from "./../../graphql/mutations";
import { useAuth } from "./../../hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";
import { onPutChatdata } from "./../../graphql/subscriptions";
import { TextFieldTheme } from "../../components/styled/theme";

interface ChatProps {}

type FormInput = {
  message: string;
};

export const Chat: React.FC<ChatProps> = ({}) => {
  const auth = useAuth();

  const [chatMessage, setChatMessage] = React.useState<any>({});

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();

  /**
   * メッセージ送信イベント
   */
  const handlePutMessage = async () => {
    try {
      const dt = new Date().toISOString();
      const variables = {
        chatId: 1,
        datetimeuser: dt + "#" + auth.nickname,
        datetime: dt,
        message: getValues("message"),
        user: auth.nickname,
      };
      console.log(variables);
      const res: any = await API.graphql({
        query: putChatdata,
        variables: { input: variables },
      });
      console.log(res);
    } catch (err: any) {
      //TODO:エラー処理
    }
  };

  /**
   * サブスクリプション
   */
  const subscribePutChat = async () => {
    try {
      const subscription: any = await API.graphql({
        query: onPutChatdata,
        variables: {
          chatId: "1",
        },
        //@ts-ignore
      }).subscribe({
        next: (response: any) => {
          if (response.value.data.onPutChatdata.chatId === "1") {
            getChat();
          }
        },
      });
    } catch (err: any) {
      //TODO: エラー処理
    }
  };

  const getChat = async () => {
    try {
      const res: any = await API.graphql({
        query: queryChatdataByServiceid,
        variables: { chatId: "1" },
      });
      setChatMessage(res.data.queryChatdataByServiceid.items);
      console.log(res);
      console.log(res.data.queryChatdataByServiceid.items);
    } catch (err: any) {
      //TODO:エラー処理
    }
  };

  React.useEffect(() => {
    (async () => {
      await getChat();
    })();

    subscribePutChat();

    //   return () => {
    //     second
    //   }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={TextFieldTheme}>
        <Header />
        <TextField {...register("message")} />
        <Button onClick={handlePutMessage}>aaa</Button>
        {Object.values(chatMessage).map((row: any) => {
          return (
            <Typography>
              {row.message} : {row.user}
            </Typography>
          );
        })}
      </ThemeProvider>
    </React.Fragment>
  );
};
