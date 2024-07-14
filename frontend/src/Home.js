import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './global.css';
import './index.css';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateSchemaClick = () => {
    navigate('/create-schema');
  };

  return (
    <div className="root">
      <header className="header">
        <div className="image-22-parent">
          <img
            className="image-22-icon"
            loading="lazy"
            alt="image-22"
            src={`${process.env.PUBLIC_URL}/image-22@2x.png`}
          />
          <div className="tokematic-wrapper">
            <div className="tokematic"></div>
          </div>
        </div>
        <nav className="navigation-links-wrapper">
          <div className="navigation-links">
            <Link to="/" className="home">Home</Link>
            <Link to="/schema" className="about-us">Schema</Link>
            <Link to="/contact-us" className="contact-us">Contact Us</Link>
          </div>
        </nav>
      </header>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-left-inner">
              <div className="frame-parent">
                <div className="sub-title-wrapper">
                  <div className="sub-title">Decentralized verification</div>
                </div>
                <div className="frame-child"></div>
              </div>
            </div>
            <h1 className="heading">Unlock a new era of trust and transparency</h1>
          </div>
          <div className="hero-description-wrapper">
            <div className="hero-description">
              An open-source infrastructure for verifying and attesting information
            </div>
          </div>
        </div>
        <div className="hero-section-inner">
          <div className="image-24-parent">
            <img
              className="image-24-icon"
              alt="image-24"
              src={`${process.env.PUBLIC_URL}/image-24@2x.png`}
            />
            <button className="button" onClick={handleCreateSchemaClick}>
              <div className="create-schema-wrapper">
                <div className="create-schema">Create Schema</div>
              </div>
              <img
                className="arrow-right-icon"
                alt="arrow-right"
                src={`${process.env.PUBLIC_URL}/arrowright.svg`}
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
