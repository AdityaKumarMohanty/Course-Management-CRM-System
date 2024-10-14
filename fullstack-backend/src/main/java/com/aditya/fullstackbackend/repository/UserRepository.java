package com.aditya.fullstackbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aditya.fullstackbackend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query("SELECT u FROM User u LEFT JOIN FETCH u.courses")
    List<User> findAllUsersWithCourses();
	List<User> findByUsername(String username);

}
