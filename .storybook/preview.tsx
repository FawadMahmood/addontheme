import type { Preview} from "@storybook/react";
import React, { useCallback, useEffect, useState } from 'react';
import {  } from '@storybook/react';
import { ThemeProvider  } from 'styled-components';
import theme from '../src/components/theme.json';

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
          const theme = await response.json();
          setCurrentTheme(theme);
        } else {
          console.error('Failed to update theme');
        }
      } catch (error) {
        console.error('Error updating theme:', error);
      }
    }, [context.globals.theme]);

    useEffect(() => {
      fetchTheme();
    }, [context.globals.theme]);
    
     return(
      <ThemeProvider theme={currentTheme ?? theme.default}>
        <Story />
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

export const globalTypes = {
  theme:{
    type:'string',
    toolbar:{
      title:'Theme',
      items: Object.keys(theme), 
      dynamicTitle: true,
    }
  },
}

export default preview;



