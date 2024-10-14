package com.aditya.fullstackbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aditya.fullstackbackend.model.Product;
import com.aditya.fullstackbackend.model.User;

public interface ProductRepository extends JpaRepository<Product,Long>
{
	
	List<Product> findByTutor(User tutor);
	List<Product> findByName(String name);
}
