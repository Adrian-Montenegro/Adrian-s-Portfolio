import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="portfolio-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Adrian Montenegro</h3>
          <p>
            Civil & Environmental Engineer blending technical precision with creative 
            problem-solving.
          </p>
        </div>
        
        <div className="footer-links">
          <h4>Work</h4>
          <ul>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#research">Research</a></li>
            <li><a href="#academic">Academic</a></li>
            <li><a href="#design">Design</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://linkedin.com/in/adrian-montenegro" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="mailto:adrian@montenegro-engineering.com">Email</a></li>
            <li><a href="/assets/documents/Adrian_Montenegro_CV.pdf" target="_blank">CV Download</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 Adrian Montenegro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;