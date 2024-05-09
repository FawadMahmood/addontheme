import type { Preview} from "@storybook/react";
import React, { useCallback, useEffect, useState } from 'react';
import {  } from '@storybook/react';
import { ThemeProvider  } from 'styled-components';
import theme from '../src/components/theme.json';

// Define the shape of your context state
interface ContextState {
  fetchTheme: (newTheme: string) => void;
}

// Create the context with default values
export const MyThemeContext = React.createContext<ContextState>({
  fetchTheme: () => {},
});

const preview: Preview = {
  decorators: [(Story,context)=>{
    const [currentTheme, setCurrentTheme] = useState(null);

    const fetchTheme = useCallback(async () => {
      try {
        const response = await fetch(`http://localhost:3001/${context.globals.theme}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
         
        });
        if (response.ok) {
          // console.log(`Theme "${theme}" response body`,await response.json());
           setCurrentTheme(await response.json())
          
        } else {
          console.error('Failed to update theme');
        }
      } catch (error) {
        console.error('Error updating theme:', error);
      }
    }, []);

    useEffect(() => {
      fetchTheme();
    }, []);
    
     return(
      <ThemeProvider theme={currentTheme ?? theme.default}>
        <MyThemeContext.Provider value={{ fetchTheme }}>
          <Story />
        </MyThemeContext.Provider>
      </ThemeProvider>
      )}],

  parameters: {
    backgrounds: {
      default: "dark",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};


// const themes = {
//   default: {
//     // Define your default theme properties
//     backgroundColor: '#007bff',
//     hoverColor: '#0056b3',
//     activeColor: '#004080',
//     textColor: '#fff',
//   },
//   red: {
//     // Define your red theme properties
//     backgroundColor: '#ff0000',
//     hoverColor: '#cc0000',
//     activeColor: '#990000',
//     textColor: '#fff',
//   },
//   green: {
//     // Define your green theme properties
//     backgroundColor: '#00cc00',
//     hoverColor: '#009900',
//     activeColor: '#006600',
//     textColor: '#fff',
//   },
//   blue: {
//     // Define your blue theme properties
//     backgroundColor: '#0000ff',
//     hoverColor: '#0000cc',
//     activeColor: '#000099',
//     textColor: '#fff',
//   },
//   purple: {
//     // Define your purple theme properties
//     backgroundColor: '#800080',
//     hoverColor: '#660066',
//     activeColor: '#4c004c',
//     textColor: '#fff',
//   },
//   yellow: {
//     // Define your yellow theme properties
//     backgroundColor: '#ffff00',
//     hoverColor: '#cccc00',
//     activeColor: '#999900',
//     textColor: '#fff',
//   },
//   orange: {
//     // Define your orange theme properties
//     backgroundColor: '#ff8000',
//     hoverColor: '#cc6600',
//     activeColor: '#994d00',
//     textColor: '#fff',
//   },
// };
export const globalTypes = {
  theme:{
    type:'string',
    toolbar:{
      title:'Theme',
      items: Object.keys(theme), 
      dynamicTitle: true,
    }
  }
}



export default preview;



