package com.ssafy.raonzena.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "image_theme")
public class ImageTheme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "theme_no", nullable = false)
    private Long themeNo;

    @Column(name = "image", nullable = false, length = 500)
    private String image;

    @Column(name = "level", nullable = false)
    private Integer level;

}