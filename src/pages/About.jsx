import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <div className="glassmorphism fade-in" style={{ padding: '60px', borderRadius: 'var(--radius-lg)', display: 'inline-block', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '24px' }}>Our Story</h1>
            <p style={{ fontSize: '1.4rem' }}>
              A journey of flavors, tradition, and homemade goodness.
            </p>
          </div>
        </div>
      </div>

      <div className="container section-padding">
        <div className="story-layout">
          <div className="story-content fade-in glassmorphism" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
            <h2>The Heart of Jozef Foods</h2>
            <p>
              It all started in a small kitchen, where authentic recipes were passed down through generations. 
              At Jozef Foods, we believe that the best meals are made with patience, love, and the purest ingredients.
            </p>
            <p>
              Our founder realized that the modern fast-paced world was losing touch with the true, traditional flavors 
              of homemade pickles and spice powders. Commercial products were filled with preservatives and artificial colors, 
              lacking the soul of a home-cooked meal.
            </p>
            <p>
              That's why Jozef Foods was born. We source the finest raw ingredients directly from local farmers, 
              sun-dry our spices, and age our pickles naturally. Every jar you open is a tribute to heritage and 
              a promise of quality.
            </p>
            <h3>Our Promise</h3>
            <ul>
              <li>100% Homemade Process</li>
              <li>Zero Artificial Preservatives</li>
              <li>Locally Sourced Ingredients</li>
              <li>Authentic, Traditional Recipes</li>
            </ul>
          </div>
          <div className="story-image fade-in" style={{animationDelay: '0.3s'}}>
            <video 
              src="/media/productlaunch vedio.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
              style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
