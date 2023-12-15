package com.thenetvalue.sbTutorial1.model;

public enum Ruolo {
    ROLE_USER(Authorities.USER_AUTHORITIES),
    ROLE_MOD(Authorities.MOD_AUTHORITIES),
    ROLE_ADMIN(Authorities.ADMIN_AUTHORITIES);

    private String[] authorities;

    Ruolo(String... authorities) {
        this.authorities = authorities;
    }

    public String[] getAuthorities() {
        return authorities;
    }
}
