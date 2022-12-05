import {ACTIONS} from "./action";

const INIT_STATE = {
  newMessages: [], // {chatId: number, text: string}
  messagesLoading: false,
  messages: [],

  chatLoading: false,
  detailLoading: false,
  sendingMessage: false,
  grabbedUsers: [],


  chat: {},
  chats: [],
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.startChatsLoading):
      return {
        ...state,
        chatLoading: true,
      };
    case String(ACTIONS.endChatsLoading):
      return {
        ...state,
        chatLoading: false,
        chats: payload.chats
      };
    case String(ACTIONS.detailLoading):
      return {
        ...state,
        detailLoading: !state.detailLoading,
      };
    case String(ACTIONS.setNewMessage):
      const {chatId, text} = payload;
      const chat = state.newMessages.find(v => v?.chatId === chatId);
      if (chat) chat.text = text;
      else state.newMessages.push(payload);

      return {
        ...state,
      };
    case String(ACTIONS.setChat):
      return {
        ...state,
        chat: payload?.chat,
      };
    case String(ACTIONS.getMessages.request):
      return {
        ...state,
        messagesLoading: true,
      };
    case String(ACTIONS.getMessages.success):
      return {
        ...state,
        messagesLoading: false,
        messages: payload.messages
      };
    case String(ACTIONS.getMessages.fail):
      return {
        ...state,
        messagesLoading: false,
      };

    case String(ACTIONS.sendMessage.request):
      return {
        ...state,
        sendingMessage: true,
      };
    case String(ACTIONS.sendMessage.success):
      state.messages.push(payload.newMessage)
      return {
        ...state,
        sendingMessage: false,
        messages: state.messages
      };
    case String(ACTIONS.sendMessage.fail):
      return {
        ...state,
        sendingMessage: false,
      };

    default:
      return state;
  }
}
