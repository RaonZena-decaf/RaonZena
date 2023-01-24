package com.example.suhee_practice.service;


import com.example.suhee_practice.aggregate.club.CommunityMember;
import com.example.suhee_practice.service.sdo.MemberCdo;
import com.example.suhee_practice.shared.NameValueList;

import java.util.List;

public interface MemberService {
	//
	String registerMember(MemberCdo member);
	CommunityMember findMemberById(String memberId);
	CommunityMember findMemberByEmail(String memberEmail);
	List<CommunityMember> findMembersByName(String name);
	void modifyMember(String memberId, NameValueList member);
	void removeMember(String memberId);
}