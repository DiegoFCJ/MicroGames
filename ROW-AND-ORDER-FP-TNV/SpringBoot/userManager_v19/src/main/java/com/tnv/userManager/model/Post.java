package com.tnv.userManager.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="post_id", nullable = false)
    private Long id;
    @Column(nullable = false, unique = true)
    private String title;
    private String slug;
    private String content;
    @Column(nullable = false, unique = true)
    private String author;
    private LocalDateTime published_on;
    private LocalDateTime updated_on;

    public Post() {}

    public Post(String title, String slug, String content, String author) {
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.author = author;
        this.published_on = LocalDateTime.now();
        this.updated_on = LocalDateTime.now();
    }

    public LocalDateTime getPublished_on() {
        return published_on;
    }

    public void setPublished_on(LocalDateTime published_on) {
        this.published_on = published_on;
    }

    public LocalDateTime getUpdated_on() {
        return updated_on;
    }

    public void setUpdated_on(LocalDateTime updated_on) {
        this.updated_on = updated_on;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDateTime getPublishedOn() {
        return published_on;
    }

    public void setPublishedOn(LocalDateTime publishedOn) {
        this.published_on = publishedOn;
    }

    public LocalDateTime getUpdatedOn() {
        return updated_on;
    }

    public void setUpdatedOn(LocalDateTime updatedOn) {
        this.updated_on = updatedOn;
    }

    @Override
    public String toString() {
        return "Post " + this.id + ": " +
                "\ntitle = " + this.title +
                "\nslug = " + this.slug +
                "\ncontent = " + this.content +
                "\nauthor = " + this.author +
                "\npublished_on = " + this.published_on +
                "\nupdated_on = " + this.updated_on;
    }
}
