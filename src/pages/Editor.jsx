import React from 'react';

import {HtmlEditor, Image, Inject,
Link, QuickToolbar, RichTextEditorComponent,
Toolbar} from '@syncfusion/ej2-react-richtexteditor';

import Header from '../components/Header';


const Editor = () => {
  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header category='App' title='Editor' />
      <RichTextEditorComponent>
        <Inject services={[Toolbar, Image, Link,
          HtmlEditor, QuickToolbar]} />
      </RichTextEditorComponent>

    </div>
  )
}

export default Editor;