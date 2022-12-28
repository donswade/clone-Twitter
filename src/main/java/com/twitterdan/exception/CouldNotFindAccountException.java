package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class CouldNotFindAccountException extends AbstractException {
  private final static String MESSAGE = "Sorry, we could not find your account!";
  private final static HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public CouldNotFindAccountException() {
    super(CouldNotFindAccountException.STATUS, CouldNotFindAccountException.MESSAGE);
  }

  public CouldNotFindAccountException(Boolean show) {
    super(CouldNotFindAccountException.STATUS, CouldNotFindAccountException.MESSAGE, show);
  }
}
