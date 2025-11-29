import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="site-header-inner">
        <div className="site-logo">
          <span className="logo-first">ADRIAN</span>
          <span className="logo-last">MONTENEGRO</span>
        </div>
        <nav className="site-nav">
          <a href="#experience">Experience</a>
          <a href="#research">Research</a>
          <a href="#academic">Academic</a>
          <a href="#design">Design</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;