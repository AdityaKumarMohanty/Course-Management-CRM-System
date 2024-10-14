package com.aditya.fullstackbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Sales {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private int year;
	private int month;
	
	private double total_sales;



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public double getTotal_sales() {
		return total_sales;
	}

	public void setTotal_sales(double total_sales) {
		this.total_sales = total_sales;
	}
	
	

}
