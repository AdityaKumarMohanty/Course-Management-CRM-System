package com.aditya.fullstackbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aditya.fullstackbackend.model.Sales;
import java.util.List;


public interface SalesRepositry extends JpaRepository<Sales,Long>
{
	List<Sales> findByYearAndMonth(int year, int month);
	List<Sales> findByYear(int year);
}
