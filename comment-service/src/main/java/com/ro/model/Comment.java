package com.ro.model;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime createdAt;
    private String username;

    @Column(length = 1000)
    private String comment;
    private Long movieId;
    private Long userId;
}