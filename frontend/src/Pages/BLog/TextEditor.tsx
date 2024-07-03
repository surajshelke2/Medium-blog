import React, { useState, useRef, useMemo, MutableRefObject } from 'react';
import JoditEditor, { Jodit } from 'jodit-react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

interface TextEditorProps {
  placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ placeholder }) => {
  const editor = useRef<Jodit | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [post, setPost] = useState({
    title: '',
    content: '',
    description: ''
  });

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...'
    }),
    [placeholder]
  );

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setPost({
      title: title,
      content: content,
      description: description
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title: title,
          content: content,
          description: description
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Post added successfully:', response.data);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-md rounded-lg w-full md:w-3/4 lg:w-1/2 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Create a New Post</h1>
        <form action="" method="post" onSubmit={handleAddPost} className="space-y-6">
          <div>
            <input
              className="placeholder:italic placeholder:text-2xl placeholder:text-slate-400 bg-white w-full md:py-2 py-4 lg:text-2xl lg:font-semibold lg:placeholder:font-normal pl-4 pr-3 shadow-sm focus:outline-none border border-gray-300 rounded-md"
              placeholder="Title..."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <JoditEditor
              ref={editor as MutableRefObject<Jodit | null>}
              value={content}
              config={config}
              onBlur={(newContent: string) => setContent(newContent)}
              onChange={(newContent: string) => setContent(newContent)}
            />
          </div>
          <div>
            <input
              className="placeholder:italic placeholder:text-xl placeholder:text-slate-400 bg-white w-full md:py-2 py-4 lg:text-xl lg:font-medium lg:placeholder:font-normal pl-4 pr-3 shadow-sm focus:outline-none border border-gray-300 rounded-md"
              placeholder="Write a short description..."
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextEditor;
