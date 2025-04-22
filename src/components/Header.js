import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ darkMode, setDarkMode, onCommunityClick, onLearnClick, onLanguageChange, onStartPlaying }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ageDropdownOpen, setAgeDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState(() => {
    return localStorage.getItem('selectedAge') || null;
  });
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'English';
  });

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" }
  };

  const ageGroups = [
    '8-12',
    '13-15',
    '15-18'
  ];



  // Combined menu items with their click handlers
  const menuItems = [
    { name: 'Home', handler: undefined },
    { name: 'Games', handler: onStartPlaying },
    { name: 'Learn', handler: onLearnClick },
    { name: 'Community', handler: onCommunityClick }
  ];

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    localStorage.setItem('selectedAge', age);
    setAgeDropdownOpen(false);
  };

  const handleLanguageSelect = (language) => {
    if (onLanguageChange) {
      setSelectedLanguage(language.name);
      localStorage.setItem('selectedLanguage', language.name);
      setLanguageDropdownOpen(false);
      onLanguageChange(language.code);
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
            >
              LegalChamps
              <span className="text-blue-600">.</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.div className="flex space-x-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    onClick={item.handler}
                    style={{ cursor: item.handler ? 'pointer' : 'default' }}
                    whileHover={{ scale: 1.1 }}
                    className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.a>
                ))}

                {/* Age Dropdown */}
                <div className="relative">
                  <motion.button
                    onClick={() => setAgeDropdownOpen(!ageDropdownOpen)}
                    whileHover={{ scale: 1.1 }}
                    className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    {selectedAge ? `Age: ${selectedAge}` : 'Select Age'} ▼
                  </motion.button>
                  <AnimatePresence>
                    {ageDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute top-full mt-2 py-2 w-24 rounded-lg shadow-lg ${
                          darkMode ? 'bg-gray-800' : 'bg-white'
                        }`}
                      >
                        {ageGroups.map((age) => (
                          <button
                            key={age}
                            onClick={() => handleAgeSelect(age)}
                            className={`block w-full text-left px-4 py-2 hover:bg-blue-600 hover:text-white ${
                              selectedAge === age 
                                ? 'bg-blue-600 text-white' 
                                : darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}
                          >
                            {age}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-600'}`}
              >
                {darkMode ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              <div className={`w-6 h-0.5 mb-1.5 transition-all ${darkMode ? 'bg-white' : 'bg-gray-800'} ${isOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 mb-1.5 transition-all ${darkMode ? 'bg-white' : 'bg-gray-800'} ${isOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 transition-all ${darkMode ? 'bg-white' : 'bg-gray-800'} ${isOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className={`md:hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}
            >
              <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      onClick={item.handler}
                      style={{ cursor: item.handler ? 'pointer' : 'default' }}
                      className={`text-lg ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {item.name}
                    </a>
                  ))}
                  {/* Age Dropdown for Mobile */}
                  <div className="relative">
                    <button
                      onClick={() => setAgeDropdownOpen(!ageDropdownOpen)}
                      className={`text-lg ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {selectedAge ? `Age: ${selectedAge}` : 'Select Age'}
                    </button>
                    <AnimatePresence>
                      {ageDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="ml-4 mt-2 space-y-2"
                        >
                          {ageGroups.map((age) => (
                            <button
                              key={age}
                              onClick={() => handleAgeSelect(age)}
                              className={`block w-full text-left py-1 ${
                                selectedAge === age 
                                  ? 'text-blue-600' 
                                  : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              {age}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                 
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Header; 