package com.twitterdan.service;

import com.twitterdan.dao.MessageRepository;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class MessageService {
  private final MessageRepository messageRepository;

  public MessageService(MessageRepository messageRepository) {
    this.messageRepository = messageRepository;
  }

  public List<Message> getAll() {
    return messageRepository.findAll();
  }

  public List<Message> findByChatId(Long id) {
    Optional<List<Message>> optionalMessages = messageRepository.findByChatId(id);
    return optionalMessages.orElseGet(ArrayList::new);
  }

  @Transactional
  public Message save(Message message) {
    Message savedMessage = messageRepository.save(message);
    User initUser = savedMessage.getUser();
    List<MessageSeen> list = new ArrayList<>();
    savedMessage.getChat().getUsers()
      .forEach(user -> {
        MessageSeen messageSeen = new MessageSeen();
        messageSeen.setSeen(Objects.equals(initUser.getId(), user.getId()));
        messageSeen.setMessage(savedMessage);
        messageSeen.setUser(user);
        messageSeen.setCreatedBy(savedMessage.getUser().getEmail());
        messageSeen.setUpdatedBy(savedMessage.getUser().getEmail());
        MessageSeen savedMessageSeen = messageRepository.save(messageSeen);
        list.add(savedMessageSeen);
      });
    savedMessage.setSeen(list);
    return savedMessage;
  }

  public Message saveFirstNewChatMessage(Chat chat, User user, String text) {
    MessageSeen messageSeen = new MessageSeen();
    Message message = new Message(text, new ArrayList<>(), chat, user);
    Message savedMessage = save(message);
    messageSeen.setSeen(true);
    messageSeen.setMessage(message);

    return savedMessage;
  }
}
