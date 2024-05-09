// src/ThemeSelector.js
import React, { useState } from 'react';
import Button from './Button';

const themes = {
  default: {
    backgroundColor: '#007bff',
    hoverColor: '#0056b3',
    activeColor: '#004080',
    textColor: '#fff',
  },
  red: {
    backgroundColor: '#ff0000',
    hoverColor: '#cc0000',
    activeColor: '#990000',
    textColor: '#fff',
  },
  green: {
    backgroundColor: '#00cc00',
    hoverColor: '#009900',
    activeColor: '#006600',
    textColor: '#fff',
  },
  blue: {
    backgroundColor: '#0000ff',
    hoverColor: '#0000cc',
    activeColor: '#000099',
    textColor: '#fff',
  },
  purple: {
    backgroundColor: '#800080',
    hoverColor: '#660066',
    activeColor: '#4c004c',
    textColor: '#fff',
  },
};

const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');

  const selectTheme = (themeName) => {
    setSelectedTheme(themeName);
    const event = new CustomEvent('set-theme', { detail: themeName });
    window.dispatchEvent(event);
  };

  return (
    <div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button>Toggle Theme</button>
        <div style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', zIndex: 1 }}>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
            {Object.keys(themes).map((themeName) => (
              <li key={themeName} style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={() => selectTheme(themeName)}>
                {themeName}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button theme={themes[selectedTheme]} />
    </div>
  );
};

export default ThemeSelector;