package com.ssafy.raonzena.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.raonzena.api.response.ImageThemeRes;


import com.ssafy.raonzena.db.entity.QImageTheme;
import static com.ssafy.raonzena.db.entity.QImageTheme.imageTheme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GameThemeRepositorySupport {

    @Autowired
    private JPAQueryFactory query;

    public List<ImageThemeRes> getThemes(int level){

        return query
                .select(Projections.fields(ImageThemeRes.class,
                        imageTheme.themeNo,imageTheme.imageUrl,imageTheme.level,imageTheme.imageName))
                .from(imageTheme)
                .where(imageTheme.level.loe(level))
                .fetch();
    }
}
