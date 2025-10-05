// components/common/TinyMCEEditor.jsx
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = ({ value, onChange }) => {
    console.log('text editoe',value);
    
  return (
    <Editor
  apiKey="9tishee4xbjkm9oa60hijqdc2sc39g5ycbo44gzr6ud28xc7 "
  value={value}
  init={{
    height: 300,
    menubar: false,
    plugins: ['lists', 'color'],
    toolbar: 'bold italic forecolor backcolor | bullist numlist',
    color_map: [
      '000000', 'Black',
      '787878', 'Red',
      '00FF00', 'Green',
      '0000FF', 'Blue',
      'FFFF00', 'Yellow',
      'FFFFFF', 'White'
    ],
  }}
  onEditorChange={(content) => onChange(content)}
/>

  );
};

export default TinyMCEEditor;
