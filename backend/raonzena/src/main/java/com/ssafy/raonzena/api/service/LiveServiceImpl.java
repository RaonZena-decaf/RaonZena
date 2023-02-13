package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.request.PasswordReq;
import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.db.entity.RoomInfo;
import com.ssafy.raonzena.db.repository.LiveRepository;
import com.ssafy.raonzena.db.repository.LiveRepositorySupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;

/**
 *	실행중인 게임방 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Slf4j
@Service
@Transactional
public class LiveServiceImpl implements LiveService {

    @Autowired
    LiveRepositorySupport liveRepositorySupport;

    @Autowired
    LiveRepository liveRepository;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Override
    public String passwordCheck(PasswordReq passwordReq) {
        String password = liveRepositorySupport.password(passwordReq.getRoomNo());
        if(password != null && password.equals(passwordReq.getInputPassword())){
            return "SUCCESS";
        }
        return "FAIL";
    }

    @Override
    public List<LiveRoomInfoRes> findRooms(Map<String, Object> conditions){
        // 현재 실행중인 방 조회
        return liveRepositorySupport.selectRooms(conditions);
    }

    @Override
    public List<LiveRoomInfoRes> findFollowingRooms(long userNo) {
        // 팔로잉 유저들의 방 조회
        return liveRepositorySupport.selectFollowingRooms(userNo);
    }

    @Override
    public boolean isAccessible(long roomNo, int sessionHeadCount) { /////////세션정보 필요//////////
        // 유저 게임 참가 가능 여부 조회
        return liveRepositorySupport.isAccessible(roomNo,sessionHeadCount);
    }

    @Override
    public boolean onoff(long followNo) {
        // 팔로우한 사람의 현재상태
        String key = "userNo"+followNo;
        if (redisTemplate.opsForValue().get(key) != null){
            // redis에 저장되어 있으면 online상태
            return true;
        }
        return false;
    }

    @Override
    public boolean removeRoom(long roomNo) {
        // 방 삭제
        RoomInfo roomInfo = liveRepository.findByRoomNo(roomNo);
        if(roomInfo != null){
            liveRepository.delete(roomInfo);
            return true;
        }
        return false;
    }
}
