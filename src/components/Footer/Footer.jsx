import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="relative overflow-hidden py-10 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap justify-between border-b border-gray-700 pb-10">
          <div className="w-full md:w-1/2 lg:w-4/12 mb-8 md:mb-0">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-gray-400">
                &copy; 2023 DevUI. All rights reserved.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-1/2 lg:w-2/12 mb-8 md:mb-0">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Company
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300 transition">Features</Link></li>
              <li><Link to="/" className="hover:text-gray-300 transition">Pricing</Link></li>
              <li><Link to="/" className="hover:text-gray-300 transition">Affiliate Program</Link></li>
              <li><Link to="/" className="hover:text-gray-300 transition">Press Kit</Link></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 lg:w-2/12 mb-8 md:mb-0">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Support
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300 transition">Account</Link></li>
              <li><Link to="/" className="hover:text-gray-300 transition">Help</Link></li>
              <li><Link to="/" className="hover:text-gray-300 transition">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-gray-300 transition">Customer Support</Link></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 lg:w-3/12">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Legals
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300 transition">Terms & Conditions</Link></li>
              <li><Link to="/" className="hover:text-gray-300 transition">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-gray-300 transition">Licensing</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Built with ❤️ using React & Tailwind CSS
        </div>
      </div>
    </footer>
  )
}

export default Footer
