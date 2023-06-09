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

    @Column(name = "image_url", nullable = false, length = 200)
    private String imageUrl;

    @Column(name = "level", nullable = false)
    private Integer level;

    @Column(name="image_name")
    private String imageName;

}