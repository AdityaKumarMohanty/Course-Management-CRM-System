package com.aditya.fullstackbackend.controller;

import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aditya.fullstackbackend.model.Sales;
import com.aditya.fullstackbackend.model.Student;
import com.aditya.fullstackbackend.model.User;
import com.aditya.fullstackbackend.repository.ProductRepository;
import com.aditya.fullstackbackend.repository.SalesRepositry;
import com.aditya.fullstackbackend.repository.StudentRepository;
import com.aditya.fullstackbackend.repository.UserRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class StudentController {
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private SalesRepositry salesRepositry;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@GetMapping("/students")
	public List<Student> findAllStudents()
	{
		return studentRepository.findAll();
	}
	
	@GetMapping("/student/{id}")
	public Student findAllStudents(@PathVariable Long id)
	{
		return studentRepository.findById(id)
				.orElseThrow(() -> new StudentNotFoundException(id));
	}
	
	@PostMapping("/student/{id}")
	public Student addStudent(@RequestBody Student newStudent,@PathVariable Long id)
	{
		if(newStudent.getStatus().equals("enrolled"))
		{
			Calendar cal=Calendar.getInstance();
			
			int year=cal.get(Calendar.YEAR);
			int month=cal.get(Calendar.MONTH)+1;
			
			List<Sales> cur_saleList=salesRepositry.findByYearAndMonth(year, month);
			var price=productRepository.findByName(newStudent.getIntrestedCourse());
			
			if(cur_saleList.size() > 0)
			{
				var cur_sale=cur_saleList.get(0);
				double new_sale=cur_sale.getTotal_sales()+price.get(0).getPrice();
				cur_sale.setTotal_sales(new_sale);
				salesRepositry.save(cur_sale);
				
			}
			else {
				Sales sales=new Sales();
				sales.setYear(year);
				sales.setMonth(month);
				
				
				sales.setTotal_sales((double)(price.get(0).getPrice()));
				
				salesRepositry.save(sales);
			
			}
			
			var user=userRepository.findById(id);
			
			if(user.isPresent())
			{
				double total_till_now= user.get().getTotal_sale();
				user.get().setTotal_sale(total_till_now+price.get(0).getPrice());
			}
			else throw new UserNotFoundException(id);
			
		}
		
		
		return studentRepository.save(newStudent);
	}
	
	@PutMapping("/student/{studentId}/employee/{employeeId}")
	Student updateStudent(@RequestBody Student newStudent, @PathVariable Long studentId, @PathVariable Long employeeId) {
	    return studentRepository.findById(studentId)
	        .map(student -> {
	            student.setEmail(newStudent.getEmail());
	            student.setIntrestedCourse(newStudent.getIntrestedCourse());
	            student.setName(newStudent.getName());
	            student.setNoOfCalls(newStudent.getNoOfCalls());
	            student.setPhoneNumber(newStudent.getPhoneNumber());

	            // Check if status is being changed to "enrolled"
	            if (!student.getStatus().equals("enrolled") && newStudent.getStatus().equals("enrolled")) {
	                // Update sales data
	                Calendar cal = Calendar.getInstance();
	                int year = cal.get(Calendar.YEAR);
	                int month = cal.get(Calendar.MONTH) + 1;

	                // Fetch the product price based on the interested course
	                var price = productRepository.findByName(newStudent.getIntrestedCourse());

	                // Update current month's sales
	                List<Sales> curSaleList = salesRepositry.findByYearAndMonth(year, month);
	                if (curSaleList.size() > 0) {
	                    var curSale = curSaleList.get(0);
	                    double newSale = curSale.getTotal_sales() + price.get(0).getPrice();
	                    curSale.setTotal_sales(newSale);
	                    salesRepositry.save(curSale);
	                } else {
	                    // Create new sales entry if it doesn't exist for the current month
	                    Sales sales = new Sales();
	                    sales.setYear(year);
	                    sales.setMonth(month);
	                    sales.setTotal_sales(price.get(0).getPrice());
	                    salesRepositry.save(sales);
	                }

	                // Update employee total sales
	                var user = userRepository.findById(employeeId);
	                if (user.isPresent()) {
	                    double totalTillNow = user.get().getTotal_sale();
	                    user.get().setTotal_sale(totalTillNow + price.get(0).getPrice());
	                } else {
	                    throw new UserNotFoundException(employeeId);
	                }
	            }

	            // After handling sales update, update the student's status
	            student.setStatus(newStudent.getStatus());
	            return studentRepository.save(student);
	        })
	        .orElseThrow(() -> new StudentNotFoundException(studentId));
	}

	
	@DeleteMapping("/student/{id}")
	String deleteStudent(@PathVariable Long id) {
	    if (!studentRepository.existsById(id)) {
	        throw new StudentNotFoundException(id); // Custom exception for Student not found
	    }
	    studentRepository.deleteById(id);
	    return "Student with the id " + id + " has been successfully deleted.";
	}
	
	@GetMapping("/employee/{userId}")
    public ResponseEntity<?> getEmployeeSales(@PathVariable Long userId) {
        // Find the user by userId
        Optional<User> user = userRepository.findById(userId);
        
        if (user.isPresent()) {
            double totalSales = user.get().getTotal_sale(); // Get the employee's total sales
            return ResponseEntity.ok(Map.of("total_sales", totalSales));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
	
	@GetMapping("/company/current-month")
    public ResponseEntity<?> getCompanySalesForCurrentMonth() {
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;

        // Retrieve the sales for the current year and month
        List<Sales> currentMonthSales = salesRepositry.findByYearAndMonth(year, month);

        if (currentMonthSales.size() > 0) {
            double totalSales = currentMonthSales.get(0).getTotal_sales();
            return ResponseEntity.ok(Map.of("total_sales", totalSales));
        } else {
            return ResponseEntity.ok(Map.of("total_sales", 0)); // Return 0 if no sales found
        }
    }
	
	@GetMapping("/company/current-year")
    public List<Sales> getSalesForCurrentYear() {
        int currentYear = java.util.Calendar.getInstance().get(java.util.Calendar.YEAR);
        return salesRepositry.findByYear(currentYear);
    }
	
	@GetMapping("/leader-board")
	public List<User> getForLeaderBoardList()
	{
		List<User> allUsers= userRepository.findAll();
		
		Collections.sort(allUsers,(a,b) -> Double.compare(b.getTotal_sale(),a.getTotal_sale()));
		
		return allUsers;
	}

}
