package com.example.suhee_practice.controller;

import com.example.suhee_practice.aggregate.club.TravelClub;
import com.example.suhee_practice.service.ClubService;
import com.example.suhee_practice.service.sdo.TravelClubCdo;
import com.example.suhee_practice.shared.NameValueList;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClubController {

    @Autowired
    private ClubService clubService;

    @PostMapping("/club")
    public String register(@RequestBody TravelClubCdo travelClubCdo){
        return clubService.registerClub(travelClubCdo);
    }

    @GetMapping("/club/all")
    public List<TravelClub> findAll(){
        return clubService.findAll();
    }
    @GetMapping("/club/{clubId}")
    public TravelClub find(@PathVariable String clubId){
        return clubService.findClubById(clubId);
    }

    @GetMapping("/club") //localhost:8080/club?name=javatravel
    public List<TravelClub> findByName(@RequestParam String name){
        return clubService.findClubsByName(name);
    }

    @PutMapping("/club/{clubId}")
    public void modify(@PathVariable String clubId, @RequestBody NameValueList nameValueList){
        clubService.modify(clubId,nameValueList);
    }
    @DeleteMapping("/club/{clubId}")
    public void delete(@PathVariable String clubId){
        clubService.remove(clubId);
    }


}
