// src/layouts/FooterLayout.jsx
import React from 'react';

export default function Footer() {
  return (
    <>
      <footer className="bg-dark text-light border-top border-body py-4">
        <div className="container text-center">
          <div className="">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} 本網站僅供個人作品使用，不提供商業用途
              {/* <span>|</span>
              <a href="#/login" class="" target="_blank">登入後台</a> */}
            </p>
          </div>
          {/* <div className="d-flex justify-content-center gap-3">
            <a href="https://facebook.com" target="_blank" className="text-light"><i className="bi bi-facebook"></i></a>
            <a href="https://twitter.com" target="_blank" className="text-light"><i className="bi bi-twitter"></i></a>
            <a href="https://instagram.com" target="_blank" className="text-light"><i className="bi bi-instagram"></i></a>
          </div> */}
        </div>
      </footer>
    </>
  );
};