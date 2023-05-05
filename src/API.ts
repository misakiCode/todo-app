/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type PutChatdataInput = {
  chatId: string,
  datetimeuser: string,
  datetime: string,
  message: string,
  user: string,
};

export type Chatdata = {
  __typename: "Chatdata",
  chatId?: string | null,
  datetimeuser?: string | null,
  datetime?: string | null,
  message?: string | null,
  user?: string | null,
};

export type ChatdataConnection = {
  __typename: "ChatdataConnection",
  items?:  Array<Chatdata | null > | null,
  nextToken?: string | null,
};

export type PutChatdataMutationVariables = {
  input: PutChatdataInput,
};

export type PutChatdataMutation = {
  putChatdata?:  {
    __typename: "Chatdata",
    chatId?: string | null,
    datetimeuser?: string | null,
    datetime?: string | null,
    message?: string | null,
    user?: string | null,
  } | null,
};

export type QueryChatdataByServiceidQueryVariables = {
  chatId: string,
};

export type QueryChatdataByServiceidQuery = {
  queryChatdataByServiceid?:  {
    __typename: "ChatdataConnection",
    items?:  Array< {
      __typename: "Chatdata",
      chatId?: string | null,
      datetimeuser?: string | null,
      datetime?: string | null,
      message?: string | null,
      user?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnPutChatdataSubscriptionVariables = {
  chatId: string,
};

export type OnPutChatdataSubscription = {
  onPutChatdata?:  {
    __typename: "Chatdata",
    chatId?: string | null,
    datetimeuser?: string | null,
    datetime?: string | null,
    message?: string | null,
    user?: string | null,
  } | null,
};
