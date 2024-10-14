import React from "react";

export default function ContactUs() {
  const contactDetails = {
    address: "123 CRM Street, Bhubaneswar 456, Business City, BC 78910",
    phone: "+1 (555) 123-4567",
    email: "contact@crmsystem.com"
  };

  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.881453222871!2d85.8189496!3d20.2960599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19084e3c34fdff%3A0x4e3f0d2c1b7cf27!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1694567832907!5m2!1sen!2sin";

  return (
    <div className="container mt-5">
      <h1>Contact Us</h1>
      <p>If you have any queries, feel free to reach us at:</p>
      <ul className="list-unstyled">
        <li><strong>Address:</strong> {contactDetails.address}</li>
        <li><strong>Phone:</strong> {contactDetails.phone}</li>
        <li><strong>Email:</strong> <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></li>
      </ul>
      
      <h2 className="mt-4">Our Location</h2>
      <div className="map-container">
        <iframe
          src={mapSrc}
          width="500"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        ></iframe>
      </div>

      {/* Inline CSS for styling */}
      <style>
        {`
          .map-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding-top: 20px;
          }

          .container {
            padding: 0 15px;
          }

          h1, h2 {
            text-align: center;
          }

          .list-unstyled {
            padding-left: 0;
          }

          .list-unstyled li {
            margin-bottom: 10px;
          }

          a {
            color: #007bff;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
}
