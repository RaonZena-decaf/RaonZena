package com.example.suhee_practice.util.exception;

public class NoSuchMemberException extends RuntimeException {
	//
	private static final long serialVersionUID = 5867172506387382920L;

	public NoSuchMemberException(String message) {
		super(message); 
	}
}