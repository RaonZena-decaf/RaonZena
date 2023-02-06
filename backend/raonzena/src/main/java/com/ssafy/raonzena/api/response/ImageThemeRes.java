package com.ssafy.raonzena.api.response;

import com.ssafy.raonzena.db.entity.ImageTheme;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ImageThemeRes {

    private long themeNo;

    private String imageUrl;

    private int level;

    @Builder
    public ImageThemeRes(ImageTheme imageTheme) {
        this.themeNo = imageTheme.getThemeNo();
        this.imageUrl = imageTheme.getImageUrl();
        this.level = imageTheme.getLevel();
    }
}
