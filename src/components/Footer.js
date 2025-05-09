import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-3 text-center">
      <div className="container">
        <span className="text-muted">© {new Date().getFullYear()} MyApp. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
