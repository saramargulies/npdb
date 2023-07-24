import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="column">
          <h4>
            <img src="/NPSlogo.png" alt="NPS logo" className="image" />
          </h4>
          <ul className="list">
            <li>This website was made using</li>
            <li>the National Park Service API at</li>
            <li>
              <a
                href="https://www.nps.gov/subjects/developer/index.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.nps.gov/index.htm/
              </a>
            </li>
          </ul>
        </div>

      </div>
      <div className="bottom">
        <p>&copy; {new Date().getFullYear()} National Parks Database</p>
      </div>
    </footer>
  );
};

export default Footer;
