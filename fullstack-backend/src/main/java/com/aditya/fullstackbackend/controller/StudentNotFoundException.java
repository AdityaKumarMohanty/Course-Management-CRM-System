package com.aditya.fullstackbackend.controller;

public class StudentNotFoundException extends RuntimeException
{
	public StudentNotFoundException(Long id)
	{
		super("could not found student with id "+id);
	}
}
