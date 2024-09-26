"use client"; // Add this line at the top

import { Props } from "next/dist/client/script";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

// interface Props {}

const Navbar: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-400 to-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-6">
        {/* Brand Name or Logo */}
        <h1 className="font-bold text-white text-2xl">Quizz App</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-yellow-300 transition-colors duration-300">
            Home
          </Link>
          <Link href="/startQuiz" className="hover:text-yellow-300 transition-colors duration-300">
            Start Quiz
          </Link>
          <Link href="/learning" className="hover:text-yellow-300 transition-colors duration-300">
            Learning
          </Link>
          <Link href="/about" className="hover:text-yellow-300 transition-colors duration-300">
            About
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} transition-all`}>
        <div className="flex flex-col items-center space-y-4 py-4 bg-indigo-700">
          <Link href="/" className="text-white hover:text-yellow-300 transition-colors duration-300" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/startQuiz" className="text-white hover:text-yellow-300 transition-colors duration-300" onClick={toggleMenu}>
            Start Quiz
          </Link>
          <Link href="/learning" className="text-white hover:text-yellow-300 transition-colors duration-300" onClick={toggleMenu}>
            Learning
          </Link>
          <Link href="/about" className="text-white hover:text-yellow-300 transition-colors duration-300" onClick={toggleMenu}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;