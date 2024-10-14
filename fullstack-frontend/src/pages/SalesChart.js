import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SalesChart.css";

// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesChart() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentYear = new Date().getFullYear(); // Get the current year
  const [salesData, setSalesData] = useState({}); // State to hold sales data
  const [leaderboard, setLeaderboard] = useState([]); // State to hold employee sales data
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 10; // Number of items to display per page
  let navigate = useNavigate();

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/company/current-year`);
        const data = response.data; // Assume this returns an array of sales data for each month
        
        // Transform data into an object with month names as keys
        const salesByMonth = {};
        for (const sale of data) {
          const monthIndex = sale.month - 1; // month is 1-indexed
          salesByMonth[months[monthIndex]] = sale.total_sales; // Ensure to use the correct property
        }
        
        setSalesData(salesByMonth);
        setIsDataAvailable(true);
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setIsDataAvailable(false);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/leader-board`);
        const data = response.data; // Assume this returns an array of employee sales data
        
        // Sort employees by total sales and calculate ranks
        const sortedData = data.sort((a, b) => b.total_sale - a.total_sale);
        const rankedData = sortedData.map((employee, index) => ({
          ...employee,
          rank: index + 1, // Add rank starting from 1
        }));
        
        setLeaderboard(rankedData);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchSalesData();
    fetchLeaderboard();
  }, []);

  // Prepare data for the chart
  const data = {
    labels: months,
    datasets: [
      {
        label: `Monthly Sales in ${currentYear} (₹)`,
        data: months.map(month => salesData[month] || 0), // Sales data for each month
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Sales Chart for ${currentYear}`,
      },
    },
    scales: {
      x: {
        categoryPercentage: 0.5, // Control the overall width of the bars
        barPercentage: 0.5,       // Control the width of the individual bars
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "₹" + value; // Use ₹ for rupee symbol
          },
        },
      },
    },
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Clear admin session
    navigate("/login"); // Redirect to login page
  };

  // Pagination logic
  const totalPages = Math.ceil(leaderboard.length / itemsPerPage); // Total number of pages
  const startIndex = (currentPage - 1) * itemsPerPage; // Calculate start index for current page
  const currentLeaderboardItems = leaderboard.slice(startIndex, startIndex + itemsPerPage); // Get items for current page

  return (
    <div className="sales-chart-container" style={{ display: "flex", padding: "40px", height: "100vh" }}>
      {/* Leaderboard Section */}
      <div style={{ width: "30%", padding: "20px", borderRight: "1px solid #ccc" }}>
        <h2 className="text-center">Leaderboard</h2>
        <ul className="list-unstyled">
          {currentLeaderboardItems.map(employee => (
            <li
              key={employee.id}
              style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #eee", cursor: 'pointer' }}
              className="leaderboard-item" // Add a class for hover effect
            >
              <span>
                {employee.rank === 1 && <FontAwesomeIcon icon={faCrown} color="gold" />} 
                {employee.rank === 2 && <FontAwesomeIcon icon={faMedal} color="silver" />} 
                {employee.rank === 3 && <FontAwesomeIcon icon={faTrophy} color="brown" />} 
                {employee.rank}. {employee.name}
              </span>
              <span>₹{employee.total_sale.toFixed(2)}</span>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="pagination-controls" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-info me-2"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn btn-info ms-2"
          >
            Next
          </button>
        </div>
      </div>

      {/* Sales Chart Section */}
      <div style={{ width: "70%", padding: "20px" }}>
        <h2 className="text-center">Sales Chart</h2>

        {isDataAvailable ? (
          <div className="text-center">
            <Bar data={data} options={options} height={150} />
          </div>
        ) : (
          <div className="text-center">
            <h3>Data for {currentYear} is not available yet.</h3>
          </div>
        )}

        {/* Logout Button */}
        <button
          className="btn btn-danger position-fixed bottom-0 end-0 m-3"
          style={{ zIndex: 1000 }} // Ensure the button is on top
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
