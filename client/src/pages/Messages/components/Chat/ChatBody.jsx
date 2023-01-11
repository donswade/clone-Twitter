import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useDebouncedCallback} from 'use-debounce';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'
import PropTypes from "prop-types";


import StartMessage from "./StartMessage";
import {useModal} from "../../../../hooks/useModal";
import UserInfo from "./UserInfo";
import ScrollDownButton from "./ScrollDownButton";
import {CircularLoader, ModalWindow} from "../../../../components";
import {ACTIONS as CHAT_ACTIONS, addNewPrivateChat, addNewGroupChat} from "@redux/chat/action";
import {ACTIONS as MESSAGE_ACTIONS, getMessages, sendMessage} from "@redux/chat/message/action";
import {getChatsData, getMessagesData} from "@redux/chat/selector";
import {CHAT_TYPE} from '@utils/constants';
import {PATH} from "@utils/constants";
import {getRandomKey} from "@utils";
import MessageOwner from "./Message/MessageOwner";
import ForeignerMessage from "./Message/ForeignerMessage";
import LeaveChatMessage from "./Message/LeaveChatMessage";
import AddNewUsersMessage from "./Message/AddNewUsersMessage";


const ChatBody = ({chatId}) => {
  const {modal, toggleModal} = useModal();
  const {NEW_PRIVATE, NEW_GROUP} = CHAT_TYPE;
  const overlayRef = useRef();
  const chatBodyRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {selectedChat} = useSelector(getChatsData);
  const {messages} = useSelector(getMessagesData);
  const [visible, setVisible] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const showScrollDownButton = useDebouncedCallback(v => setVisible(v), 300);

  const getScrolling = () => {
    const offsetHeight = overlayRef?.current?.offsetHeight;
    const scrollHeight = overlayRef?.current?.scrollHeight;
    showScrollDownButton(offsetHeight !== scrollHeight);
  }

  const fetch = useDebouncedCallback(async (id) => {
    setLoading(true);
    await dispatch(getMessages(id));
    setLoading(false);
    setTimeout(() => {
      getScrolling();
      // onBottom();
    }, 200);
  }, 500);

  useEffect(() => {
    dispatch(MESSAGE_ACTIONS.resetMessages());
    fetch(chatId);
  }, [chatId]);

  const onScrollEvent = () => {
    const scroll = overlayRef?.current?.scrollTop;
    const offsetHeight = overlayRef?.current?.offsetHeight;
    const scrollHeight = overlayRef?.current?.scrollHeight;
    const maxScroll = scrollHeight - offsetHeight;

    if (scroll < maxScroll) {
      showScrollDownButton(true);
    } else if (scroll === maxScroll) {
      showScrollDownButton(false);
    }
  }

  const send = async (textMessage) => {
    if (textMessage.trim() !== '') {
      dispatch(CHAT_ACTIONS.setMessage({chatId, text: ''}));
      const type = selectedChat.type;

      if (type === NEW_PRIVATE) {
        const newChatId = await dispatch(addNewPrivateChat(selectedChat));
        navigate(PATH.MESSAGES.chat(newChatId));
        return;
      }

      if (type === NEW_GROUP) {
        const newChatId = await dispatch(addNewGroupChat(selectedChat));
        navigate(PATH.MESSAGES.chat(newChatId));
        return;
      }
      const newMessage = {
        chatId,
        key: getRandomKey(),
        text: textMessage,
        isMessageOwner: true,
        sending: true,
      };

      if (selectedChat.isPrivate || type === NEW_PRIVATE) {
        newMessage.isPrivateChat = true
        newMessage.isMessageSeen = false
      }

      if (selectedChat.isGroup || type === NEW_GROUP) {
        newMessage.isGroupChat = true
        newMessage.messagesSeen = [];
      }

      await dispatch(sendMessage(newMessage));

      inputRef.current.focus();
      onBottom();
    }
  }

  const onBottom = () => {
    // const heightBody = chatBodyRef?.current?.offsetHeight;
    // overlayRef?.current?.scroll(0, heightBody);

    scroller.scrollTo('myScrollToElement', {
      duration: 100,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: 'ScrollContainer'
    })
  }

  return (
    <BoxWrapper>
      <Box
        id='ScrollContainer'
        className='ScrollContainer'
        ref={overlayRef}
        onScroll={onScrollEvent}>
        <Box
          ref={chatBodyRef}
          className='MessagesBox'>
          {selectedChat.isPrivate && <UserInfo/>}
          {loading && (
            <Box sx={{position: 'relative', pt: 3, pb: 3}}>
              <CircularLoader/>
            </Box>
          )}
          {messages.map(message => {
              switch (true) {
                case message.isMessageOwner: {
                  return <MessageOwner
                    key={message?.key}
                    message={message}
                    toggleModal={toggleModal}
                  />
                }
                case message.isForeignerMessage: {
                  return <Box key={message?.key}>
                    <ForeignerMessage
                      message={message}
                      toggleModal={toggleModal}
                      onBottom={onBottom}
                    />
                    <Element name="myScrollToElement"></Element>
                  </Box>
                }
                case message.isLeaveChat: {
                  return <LeaveChatMessage
                    key={message?.key}
                    item={message}
                  />
                }
                case message.isAddNewUsers: {
                  return <AddNewUsersMessage
                    key={message?.key}
                    item={message}
                  />
                }
              }
            }
          )}
        </Box>
      </Box>
      <Box sx={{position: 'relative'}}>
        <Box onClick={onBottom}>
          <ScrollDownButton visible={visible}/>
        </Box>
        <StartMessage
          inputRef={inputRef}
          chatId={chatId}
          sendMessage={send}
        />
      </Box>
      <ModalWindow
        isShowing={modal.isShowing}
        toggleModal={toggleModal}
        element={modal.element}/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  boxSizing: 'border-box',
  position: 'relative',
  width: '100%',
  height: 'calc(100% - 55px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '& .ScrollContainer': {
    overflow: 'auto',
    paddingLeft: 15,
    paddingRight: 15,
  },

  '@keyframes fadein': {
    from: {opacity: 0},
    to: {opacity: 1}
  },

  '& .ScrollDownButton': {
    animation: 'fadein 0.4s',
  }
}));

ChatBody.propTypes = {
  chatId: PropTypes.number,
}

export default ChatBody;
