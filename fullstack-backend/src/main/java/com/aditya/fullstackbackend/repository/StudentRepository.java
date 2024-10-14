package com.aditya.fullstackbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aditya.fullstackbackend.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long>
{

}
