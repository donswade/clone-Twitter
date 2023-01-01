import {ACTIONS} from "./action";
import moment from "moment";

const init = {
  loading: false,
  pageNumber: 0,
  pageSize: 50,
  chatId: -1,
  chats: [],
  // messages: [],
  onBottom: false,
}

export default (state = init, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setPageNumber):
      return {
        ...state,
        pageNumber: payload.pageNumber,
      };
    case String(ACTIONS.addNewPrivateChat): {
      const find = state.chats.find(ch => ch.userTag === payload.userTag);
      if (!find) {
        state.chats = [payload, ...state.chats];
      }
    }
      return {...state};
    case String(ACTIONS.addNewGroupChat): {
      state.chats = [payload, ...state.chats];
    }
      return {...state};
    case String(ACTIONS.updateNewChat): {
      if (payload.oldKey) {
        const index = state.chats.findIndex(v => v.key === payload.oldKey);
        state.chats[index] = payload;
      } else {
        state.chats.unshift(payload);
      }
    }
      return {...state};
    case String(ACTIONS.setMessage):
      const {chatId, text} = payload;
      const chat = state.chats.find(v => v.id === chatId);
      chat.message = text;
      return {
        ...state,
      };
    case String(ACTIONS.addExistChat):
      const isExistChat = state.chats.find(v => v.id === payload?.chat?.id);
      if (!isExistChat) state.chats = [payload.chat, ...state.chats];
      return {
        ...state,
      };
    case String(ACTIONS.setChatId):
      return {
        ...state,
        chatId: payload.chatId,
      };
    case String(ACTIONS.resetChatId):
      return {
        ...state,
        chatId: -1,
      };
    case String(ACTIONS.getChats.request):
      return {
        ...state,
        loading: true,
      };
    case String(ACTIONS.getChats.success):
      return {
        ...state,
        loading: false,
        chats: payload.chats,
      };
    case String(ACTIONS.getChats.fail):
      return {
        ...state,
        loading: false,
      };
    case String(ACTIONS.setLastChatAction):
      const existChat = state.chats.find(ch => ch.id === payload.chatId);
      if (existChat) {
        existChat.lastMessage = payload;
        state.chats.sort((a, b) => {
          return !!a.lastMessage && !!b.lastMessage ? new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt) : 0
        })
      }
      return {
        ...state,
      };
    case String(ACTIONS.updateCountUnreadMessages): {
      const {chatId, countUnreadSelectedChatMessages} = payload;
      const existChat = state.chats.find(ch => ch.id === chatId);
      if (existChat) {
        existChat.lastMessage.countUnreadMessages = countUnreadSelectedChatMessages;
      }
    }
      return {
        ...state,
      };
    case String(ACTIONS.resetData):
      state = init;
      return {
        ...state,
      };
    default:
      return state;
  }
}
