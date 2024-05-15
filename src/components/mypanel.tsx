import React, { useCallback, useEffect, useState } from "react";
import { useGlobals, useParameter } from "@storybook/manager-api";
import { AddonPanel } from "@storybook/components";
import defaultThemes from "../components/theme.json"
import { JsonEditor } from 'json-edit-react';

interface PanelProps {
  active: boolean;
}

const OptionList = ({ options }: any) => {
  return (
    <div>
      <div  >
        {options.map((option: { label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal; value: string; }, index: React.Key) => (
          <div style={{flexDirection:"row"}}>

            <div style={{marginRight:'50px'}} key={index} >
              {option.label}
            </div>
                 <input  type="text" placeholder={option.value} />
          </div>

        ))}
      </div>
     
    </div>
  );
};
export const MyPanel: React.FC<PanelProps> = (props) => {
  const parameterValue = useParameter('myAddon', null);
  const myString = parameterValue ? parameterValue?.myString : '';
  console.log('MyPanelprops', myString);
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [themes, setThemes] = useState(defaultThemes);
  const[{theme, styleKey}, updateGlobals]= useGlobals();
  console.log('styleKey', styleKey);
  const fetchTheme = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/${theme}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
       
      });
      if (response.ok) {
        const newTheme = await response.json();
        setThemes({
          ...themes,
          [theme]: newTheme,
        });
      } else {
        console.error('Failed to update theme');
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [theme]);

  useEffect(() => {
    fetchTheme();
  }, [theme]);

  for (const key in themes[theme]) {
    // Check if the key is a property of the object itself (not inherited)
    if (Object.hasOwnProperty.call(themes[theme], key)) {
      // Access the property name (key) and its corresponding value
      const propertyName = key;
      const propertyValue = themes[theme][key];
      
      console.log(`${propertyName}: ${propertyValue}`+"haahahahh");
    }
  }

  const options = [];
  // Iterate over the properties of the selected theme
  for (const key in themes[theme]) {
    if (Object.hasOwnProperty.call(themes[theme], key)) {
      // Construct the options array with property names as labels and their corresponding values
      options.push({ label: key, value: themes[theme][key] });
    }
  }

  const handleUpdate = async ({ newData } : any) => {
    // console.log("NEW DATA====",newData.backgroundColor);
    try {
      const response = await fetch(`http://localhost:3001/${theme}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        fetchTheme();
      } else {
        console.error('Failed to update theme');
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };
  return (
    <AddonPanel {...props}>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <OptionList options={options}/>
      {/* <div>Selected Theme: {globals.theme}</div> */}
    </div>
    <div>
    <button >Save</button>
      <JsonEditor
        data={ themes[theme]? themes[theme]:themes['default'] }
        onUpdate={ handleUpdate}
      />
    </div>
    </AddonPanel>
  );
};
