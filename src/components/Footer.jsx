import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer  bg-gray-500 text-base-content p-4 fixed bottom-0">
        <aside>
          <p className="text-white">
            Copyright © {new Date().getFullYear()} - All right reserved by Girish Bhargava
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer ; 