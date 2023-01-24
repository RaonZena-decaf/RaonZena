package com.example.suhee_practice.service;



import com.example.suhee_practice.aggregate.club.TravelClub;
import com.example.suhee_practice.service.sdo.TravelClubCdo;
import com.example.suhee_practice.shared.NameValueList;

import java.util.List;

public interface ClubService {
	//
	String registerClub(TravelClubCdo club);
	TravelClub findClubById(String id);
	List<TravelClub> findClubsByName(String name);
	List<TravelClub> findAll();
	void modify(String clubId, NameValueList nameValues);
	void remove(String clubId);
}
