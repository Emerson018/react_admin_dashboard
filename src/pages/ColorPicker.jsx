import React from 'react';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'; // import ColorPickerComponent

import Header from '../components/Header';

const change = (args) => {
  document.getElementById('preview').style.backgroundColor = args.currentValue.hex;
};

const ColorPicker = () => {
  return (
  <div className='chart-layout dark:bg-secondary-dark-bg'>
    
      <Header category='Color Picker' title='Pick a Color' />
      
      <div className='text-center'>
      <div  className='color-picker-bg '>  
        <div id='preview' />
        </div>
        <div className='flex justify-center items-center gap-20 flex-wrap'>
          <div>
            <p className='text-2x1 font-semibold mt-2 mb-4 dark:text-gray-200'>Inline Pallete</p>
            <ColorPickerComponent
              id='inline-pallete'
              mode='Palette'
              modeSwitcher={false}
              inline
              showButtons={false}
              change={change}
              
            />
          </div>
          <div>
            <p className='text-2x1 font-semibold mt-2 mb-4 dark:text-gray-200'>Inline Picker</p>
            <ColorPickerComponent
              id='inline-pallete'
              mode='Picker'
              modeSwitcher={false}
              inline
              showButtons={false}
              change={change}
            />
          </div>
        </div>
      </div>
    
  </div>
  );
};

export default ColorPicker;
