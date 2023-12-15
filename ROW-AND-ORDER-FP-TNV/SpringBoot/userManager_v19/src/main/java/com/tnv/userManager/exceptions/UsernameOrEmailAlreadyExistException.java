package com.tnv.userManager.exceptions;

import org.springframework.security.core.AuthenticationException;

public class UsernameOrEmailAlreadyExistException extends AuthenticationException {

    public UsernameOrEmailAlreadyExistException(final String msg) {
        super(msg);
    }

}
