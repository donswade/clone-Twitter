package com.twitterdan.controller;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/chats")
public class ChatController {

  private final ChatService chatService;

  @GetMapping
  public List<Chat> getChats(@RequestParam Long id) {

    return chatService.findAlLByUserId(id);
  }
}
