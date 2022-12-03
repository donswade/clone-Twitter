import {ACTIONS} from "./action";

const INIT_STATE = {
  message: '',
  loading: false,
  detailLoading: false,
  sendingMessage: false,
  messagesLoading: false,
  activeId: -1,
  grabbedUsers: [],
  chat: {},
  newMessages: [], // {chatId: number, text: string}
  currentChat: {},
  messages: []
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.loadingStart):
      return {
        ...state,
        loading: true,
      };
    case String(ACTIONS.loadingEnd):
      return {
        ...state,
        loading: false,
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
    case String(ACTIONS.setActiveId):
      return {
        ...state,
        activeId: payload.id,
        isChatInfo: false,
      };
    case String(ACTIONS.resetActiveId):
      return {
        ...state,
        activeId: -1,
        isChatInfo: false,
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
        messages: [...payload.messages]
      };
    case String(ACTIONS.getMessages.fail):
      return {
        ...state,
        messagesLoading: false,
      };
    default:
      return state;
  }
}
