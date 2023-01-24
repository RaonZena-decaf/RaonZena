package com.example.suhee_practice.service.logic;


import com.example.suhee_practice.aggregate.club.CommunityMember;
import com.example.suhee_practice.service.MemberService;
import com.example.suhee_practice.service.sdo.MemberCdo;
import com.example.suhee_practice.shared.NameValueList;
import com.example.suhee_practice.store.MemberStore;
import com.example.suhee_practice.util.exception.MemberDuplicationException;
import com.example.suhee_practice.util.exception.NoSuchMemberException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceLogic implements MemberService {
	//
	private MemberStore memberStore;

	public MemberServiceLogic(MemberStore memberStore) {
		//
		this.memberStore = memberStore;
	}

	@Override
	public String registerMember(MemberCdo newMemberCdo) {
		//
		String email = newMemberCdo.getEmail();
		CommunityMember member = memberStore.retrieveByEmail(email);

		if (member != null) {
			throw new MemberDuplicationException("Member already exists with email: " + member.getEmail());
		}

		member = new CommunityMember(
				newMemberCdo.getEmail(),
				newMemberCdo.getName(),
				newMemberCdo.getPhoneNumber()
		);
		member.setNickName(newMemberCdo.getNickName());
		member.setBirthDay(newMemberCdo.getBirthDay());

		member.checkValidation();

		memberStore.create(member);

		return member.getId();
	}

	@Override
	public CommunityMember findMemberById(String memberId) {
		//
		return memberStore.retrieve(memberId);
	}

	@Override
	public CommunityMember findMemberByEmail(String memberEmail) {
		//
		return memberStore.retrieveByEmail(memberEmail);
	}

	@Override
	public List<CommunityMember> findMembersByName(String name) {
		//
		return memberStore.retrieveByName(name);
	}

	@Override
	public void modifyMember(String memberId, NameValueList nameValueList) {
		//
		CommunityMember targetMember = memberStore.retrieve(memberId);

		if (targetMember == null) {
			throw new NoSuchMemberException("No such member with id " + memberId);
		}

		targetMember.modifyValues(nameValueList);

		memberStore.update(targetMember);
	}


	@Override
	public void removeMember(String memberId) {
		//
		if (!memberStore.exists(memberId)) {
			throw new NoSuchMemberException("No such member with id " + memberId);
		}

		memberStore.delete(memberId);
	}
}
