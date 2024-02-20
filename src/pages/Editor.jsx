import React from 'react';

import {HtmlEditor, Image, Inject,
Link, QuickToolbar, RichTextEditorComponent,
Toolbar} from '@syncfusion/ej2-react-richtexteditor';

import Header from '../components/Header';


const Editor = () => {
  return (
    <div className='chart-layout dark:bg-secondary-dark-bg'>
      <Header category='Editor' />
      <RichTextEditorComponent>
        <Inject services={[Toolbar, Image, Link,
          HtmlEditor, QuickToolbar]} />
      </RichTextEditorComponent>

    </div>
  )
}

export default Editor;