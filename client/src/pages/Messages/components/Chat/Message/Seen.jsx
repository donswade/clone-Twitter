import React from "react";
import {styled} from "@mui/material/styles";
import {useSelector, useDispatch} from "react-redux";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const Seen = ({message}) => {
  const dispatch = useDispatch();
  const {sending, messageSeen, messagesSeen, isMessageOwner, isPrivateChat, isGroupChat} = message;

  const text = sending ? 'Sending...' : messageSeen?.seen ? 'Seen' : 'Sent';

  const groupText = ln => {
    switch (ln) {
      case 0:
        return 'Nobody seen';
      case 1:
        return 'Seen by 1 person';
      default:
        `Seen by ${ln} people`;
    }
  }

  return (
    <>
      {
        isMessageOwner && isPrivateChat && <TypographyWrapper variant='body2'>{text}</TypographyWrapper>
      }
      {
        isMessageOwner && isGroupChat &&
        <TypographyWrapper variant='body2'>{groupText(messagesSeen.length)}</TypographyWrapper>
      }
    </>);
}

const TypographyWrapper = styled(Typography)(({theme}) => ({
  '&:before': {
    content: '"·"',
    marginLeft: '5px',
    marginRight: '5px',
  }
}));
Seen.propTypes = {
  message: PropTypes.object,
}

Text.propTypes = {
  text: PropTypes.string,
}
export default Seen;
