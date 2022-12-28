package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.response.MessageResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class MessageResponseMapper extends GeneralFacade<Message, MessageResponse> {
  public MessageResponseMapper() {
    super(Message.class, MessageResponse.class);
  }

  @Override
  protected void decorateDto(MessageResponse dto, Message entity) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
  }
}
