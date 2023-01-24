package com.example.suhee_practice.service.logic;


import com.example.suhee_practice.aggregate.club.TravelClub;
import com.example.suhee_practice.service.ClubService;
import com.example.suhee_practice.service.sdo.TravelClubCdo;
import com.example.suhee_practice.shared.NameValueList;
import com.example.suhee_practice.store.ClubStore;
import com.example.suhee_practice.util.exception.NoSuchClubException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubServiceLogic implements ClubService {
	//
	private ClubStore clubStore;

	public ClubServiceLogic(ClubStore clubStore) {
		//
		this.clubStore = clubStore;
	}

	@Override
	public String registerClub(TravelClubCdo clubCdo) {
		//
		TravelClub club = new TravelClub(clubCdo.getName(), clubCdo.getIntro());
		club.checkValidation();
		String clubId = clubStore.create(club);
		return clubId;
	}

	@Override
	public TravelClub findClubById(String id) {
		return clubStore.retrieve(id);
	}

	@Override
	public List<TravelClub> findClubsByName(String name) {
		return clubStore.retrieveByName(name);
	}

	@Override
	public List<TravelClub> findAll(){
		return clubStore.retrieveAll();
	}
	@Override
	public void modify(String clubId, NameValueList nameValueList) {
		TravelClub travelClub = clubStore.retrieve(clubId);
		if (travelClub == null) {
			throw new NoSuchClubException("No such club with id " + clubId);
		}
		travelClub.modifyValues(nameValueList);
		clubStore.update(travelClub);
	}

	@Override
	public void remove(String clubId) {
		if (!clubStore.exists(clubId)) {
			throw new NoSuchClubException("No such club with id " + clubId);
		}
		clubStore.delete(clubId);
	}
}
