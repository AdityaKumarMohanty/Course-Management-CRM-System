package com.aditya.fullstackbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aditya.fullstackbackend.controller.ProductNotFoundException;
import com.aditya.fullstackbackend.model.Product;
import com.aditya.fullstackbackend.model.User;
import com.aditya.fullstackbackend.repository.ProductRepository;
import com.aditya.fullstackbackend.repository.UserRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ProductController {

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserRepository userRepository;

	// Add a new product
	@PostMapping("/product")
	public Product newProduct(@RequestBody Product newProduct) {
	    // Save the new product to the database
	    Product savedProduct = productRepository.save(newProduct);
	    
	    // Update the assigned courses for the tutor
	    updateAssignedTutor(savedProduct.getTutor().getId(), savedProduct.getName(),true);
	    
	    return savedProduct;
	}

	
	// Get all products
	@GetMapping("/products")
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	// Get a product by ID
	@GetMapping("/product/{id}")
	public Product getProductById(@PathVariable Long id) {
		return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
	}
	// Update a product
	@PutMapping("/product/{id}")
	public Product updateProduct(@RequestBody Product newProduct, @PathVariable Long id) {
	    return productRepository.findById(id).map(product -> {
	        // Store the previous tutor ID for updating assigned courses later
	        Long previousTutorId = product.getTutor().getId();
	        String previousProductName = product.getName(); // Store the old product name

	        // Update the simple fields
	        product.setName(newProduct.getName());
	        product.setDescription(newProduct.getDescription());
	        product.setPrice(newProduct.getPrice());

	        // Fetch the new tutor (user) by ID or handle if tutor is not found
	        User newTutor = userRepository.findById(newProduct.getTutor().getId())
	            .orElseThrow(() -> new RuntimeException("Tutor not found"));

	        // Set the new tutor (user)
	        product.setTutor(newTutor);

	        // Update the assigned courses for the previous tutor
	        updateAssignedTutor(previousTutorId, previousProductName, false); // Remove old product name from previous tutor

	        // Update the assigned courses for the new tutor
	        updateAssignedTutor(newTutor.getId(), product.getName(), true); // Add new product name to the new tutor

	        return productRepository.save(product);
	    }).orElseThrow(() -> new ProductNotFoundException(id));
	}

	// Method to update assigned tutor's courses
	private void updateAssignedTutor(Long tutorId, String productName, boolean addCourse) {
	    // Fetch the user (tutor) by tutorId
	    User tutor = userRepository.findById(tutorId).orElse(null);
	    
	    if (tutor != null) {
	        // Get the current list of courses
	        List<String> currentCourses = tutor.getCourses();

	        // Initialize the list if it's null
	        if (currentCourses == null) {
	            currentCourses = new ArrayList<>();
	        }

	        if (addCourse) {
	            // Add the product name if not already present
	            if (!currentCourses.contains(productName)) {
	                currentCourses.add(productName);
	            }
	        } else {
	            // Remove the product name if present
	            currentCourses.remove(productName);
	        }

	        // Update the user's courses
	        tutor.setCourses(currentCourses);
	        
	        // Save the updated user entity
	        userRepository.save(tutor);
	    }
	}

		// Delete a product
	@DeleteMapping("/product/{id}")
	public String deleteProduct(@PathVariable Long id) {
		if (!productRepository.existsById(id)) {
			throw new ProductNotFoundException(id);
		}
		productRepository.deleteById(id);
		return "Product with the id " + id + " has been successfully deleted.";
	}
}
