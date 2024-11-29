import React, { useState } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Blogs.css"; // For custom styles
import tip from "../../assets/tip.jpg"; 
import frag from "../../assets/frag.jpg"; 
import trend from "../../assets/trend.jpg"; 
import ll from '../../assets/ll.jpg'


const Blogs = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active slide

  const blogs = [
    {
      title: "Choosing the Right Fragrance",
      image: ll,
      text: "Discover how to choose the perfect fragrance that suits your personality and lifestyle.",
    },
    {
      title: "Top Perfume Trends",
      image: trend,
      text: "Stay updated on the latest perfume trends to keep your collection fresh and modern.",
    },
    {
      title: "Layering Fragrances",
      image: frag,
      text: "Learn the art of layering fragrances to create a unique scent that’s truly yours.",
    },
    {
      title: "Perfume Care Tips",
      image: tip,
      text: "Extend the life of your perfumes with these essential storage and care tips.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
    beforeChange: (current, next) => setActiveIndex(next), // Set active slide index on change
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="blog-carousel">
      <h2>Perfume Blog</h2>
      <Slider {...settings}>
        {blogs.map((blog, index) => (
          <div 
            key={index} 
            className={`carousel-item ${index === activeIndex ? "active" : ""}`} // Add 'active' class to the active slide
          >
            <img src={blog.image} alt={blog.title} className="carousel-image" />
            <div className="carousel-text">
              <h3>{blog.title}</h3>
              <p>{blog.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Blogs;
