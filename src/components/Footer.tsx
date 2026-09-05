import { Link } from "react-router-dom";
import {
  BookOpen,
  Mail,
  Phone,
  Globe,
  Code2,
  Heart,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Main Footer */}
        <div className="grid lg:grid-cols-4 gap-14">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                <BookOpen className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-white">MCF</h2>
                <p className="text-sm text-gray-400">E-Library</p>
              </div>
            </div>

            <p className="mt-6 leading-8 text-gray-400">
              A digital library built exclusively for Methodist Campus
              Fellowship students, providing organized academic resources,
              devotionals, and study materials for spiritual and academic
              excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="hover:text-red-500 transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-red-500 transition-colors"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="hover:text-red-500 transition-colors"
                >
                  Register
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-red-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Faculties */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">
              Faculties
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>Engineering</li>
              <li>Science</li>
              <li>Arts</li>
              <li>Law</li>
              <li>Medicine</li>
              <li>Education</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">
              Contact
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-red-500" />
                <span>mcf@unn.edu.ng</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-red-500" />
                <span>+234 XXX XXX XXXX</span>
              </div>

              {/* Portfolio / GitHub / LinkedIn */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://daniel-lac.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Portfolio"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-600 transition-all duration-300 flex items-center justify-center"
                >
                  <Globe size={18} />
                </a>

                <a
                  href="https://github.com/dannytech-art"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-600 transition-all duration-300 flex items-center justify-center"
                >
                  <FaGithub size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/in/daniel-obinna-424b16365/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-600 transition-all duration-300 flex items-center justify-center"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-center lg:text-left">
              © {new Date().getFullYear()} Methodist Campus Fellowship
              E-Library. All Rights Reserved.
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              <a
                href="https://daniel-lac.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-all duration-300 group"
              >
                <Code2
                  size={18}
                  className="group-hover:rotate-12 transition-transform"
                />

                <span>Crafted with</span>

                <Heart
                  size={16}
                  className="fill-red-500 text-red-500 animate-pulse"
                />

                <span>by</span>

                <span className="font-bold text-white group-hover:text-red-500">
                  DannyTech
                </span>
              </a>

              <div className="flex items-center gap-5 text-gray-400">
                <a
                  href="https://daniel-lac.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors"
                  title="Portfolio"
                >
                  <Globe size={20} />
                </a>

                <a
                  href="https://github.com/dannytech-art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors"
                  title="GitHub"
                >
                  <FaGithub size={20} />
                </a>

                <a
                  href="https://www.linkedin.com/in/daniel-obinna-424b16365/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors"
                  title="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}