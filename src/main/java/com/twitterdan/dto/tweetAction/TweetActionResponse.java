package com.twitterdan.dto.tweetAction;

import com.twitterdan.domain.tweet.ActionType;
import com.twitterdan.domain.tweet.TweetAction;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.tweet.TweetMinDataResponse;
import com.twitterdan.dto.user.UserMinDataResponse;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
@Data
public class TweetActionResponse {

  @Enumerated(EnumType.STRING)
  private ActionType actionType;
  private UserMinDataResponse user;
}
