import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function App() {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );

  // Handle editor state changes
  const handleEditorChange = (newState: React.SetStateAction<EditorState>) => {
    setEditorState(newState);
  };

  // Convert editor content to plain text
  const getContentAsPlainText = () => {
    const contentState = editorState.getCurrentContent();
    return contentState.getPlainText();
  };

  // Handle image upload
  const uploadImageCallBack = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({ data: { link: reader.result } });
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false } },
        }}
      />
       <button
                type="button"
                onClick={()=>getContentAsPlainText()}
                className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                New Post
              </button>
    </div>
  );
}

export default App;
