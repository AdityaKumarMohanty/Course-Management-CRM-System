import React from "react";

export default function AboutUs() {
  return (
    <div className="container mt-5">
      <h1>About Us</h1>
      <p>
        Welcome to CRM System! We specialize in delivering top-notch customer relationship management solutions tailored to your business needs. Our platform helps businesses manage customer interactions, streamline processes, and enhance customer satisfaction through intuitive tools and powerful features.
      </p>
      <p>
        Our CRM system provides a comprehensive suite of functionalities including contact management, sales automation, reporting, and analytics. With our user-friendly interface and customizable options, you can easily track customer interactions, manage sales pipelines, and make data-driven decisions to drive your business forward.
      </p>
      <p>
        Our team is dedicated to ensuring that you get the most out of our CRM system, offering ongoing support and updates to keep you ahead in the competitive market.
      </p>
      <h2>Our Location</h2>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.881453222871!2d85.8189496!3d20.2960599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19084e3c34fdff%3A0x4e3f0d2c1b7cf27!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1694567832907!5m2!1sen!2sin"
          width="500"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map Location"
        ></iframe>
      </div>
    </div>
  );
}
