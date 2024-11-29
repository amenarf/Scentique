import React from 'react';
import './about.css'; 
import { StoreContext } from '../../Context/StoreContextProvider';

const About = () => {
    return (
        <div className="about">
            <h1>About Scentique</h1>
            <p>
                Welcome to Scentique, where innovation and fragrance converge. Founded by a dedicated team of scientists and perfumers, our mission is to craft exceptional perfumes that engage the senses and elevate everyday moments.
            </p>
            
            <h2>Our Mission</h2>
            <p>
                At Scentique, we are passionate about the science of scent. Our goal is to develop perfumes that are not only of the highest quality but also scientifically crafted to enrich your emotional and sensory experiences. We believe fragrance has the extraordinary power to shape moods, trigger memories, and forge connections. By merging art and science, we offer you an unforgettable olfactory journey.
            </p>
            
            <h2>Our Products</h2>
            <p>
                We offer a carefully curated selection of perfumes and scented products, each designed with precision and artistry. Our team conducts thorough research to ensure every fragrance is not only captivating but also safe for both our customers and the planet. Explore our collections and discover fragrances that perfectly reflect your personality.
            </p>
            
            <h2>Meet the Team</h2>
            <p>
                Behind every scent at Scentique is a team of passionate perfumers, skilled chemists, and fragrance lovers. Together, we push the boundaries of scent creation, combining expertise in chemistry, biology, and art to deliver a truly unique fragrance experience.
            </p>
            
            <h2>Contact Us</h2>
            <p>
                Have questions or curious to learn more about our products? We're here to help. Reach out to us at <a href="mailto:info@scentique.com">info@scentique.com</a> or connect with us on social media.
            </p>
        </div>
    );
}

export default About;
