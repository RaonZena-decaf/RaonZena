package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.response.UserProfileRes;
import com.ssafy.raonzena.db.repository.ProfileRepositorySupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 *	유저 프로필 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class ProfileServiceImpl implements ProfileService{

    @Autowired
    ProfileRepositorySupport profileRepositorySupport;

    @Override
    public List<UserProfileRes> findProfiles(Map<String, Object> conditions) {
        // 유저 프로필 조회
        return profileRepositorySupport.selectProfiles(conditions);
    }
}
