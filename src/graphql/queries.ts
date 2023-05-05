/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const queryChatdataByServiceid = /* GraphQL */ `
  query QueryChatdataByServiceid($chatId: String!) {
    queryChatdataByServiceid(chatId: $chatId) {
      items {
        chatId
        datetimeuser
        datetime
        message
        user
      }
      nextToken
    }
  }
`;
