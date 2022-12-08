import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {getTokens, setHeaderAuthorization} from "@utils";
import {interceptor} from "@service/API";
import {ACTIONS, getAuthUser} from "./user/action";

import modalReducer from "./modal/reducer";
import tweetReducer from "./tweet/reducer";
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";
import dialogReducer from "./dialog/reducer";
import messageReducer from "./message/reducer";
import messageSearchReducer from "./message/search/reducer";

import chatReducer from "./chat/reducer";

const {applyMiddleware, combineReducers, createStore} = require("redux");

const chat = combineReducers({
  chats: chatReducer,
});

const reducer = combineReducers({
  chat,
  modal: modalReducer,
  tweet: tweetReducer,
  auth: authReducer,
  user: userReducer,
  dialog: dialogReducer,
  message: messageReducer,
  messageSearch: messageSearchReducer,
})

export default () => {
  const {accessToken, tokenType} = getTokens();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  interceptor(store);

  if (accessToken) {
    setHeaderAuthorization(accessToken, tokenType);
    store.dispatch(getAuthUser());
  }

  return store;
}
