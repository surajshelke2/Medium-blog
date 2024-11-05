import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface TiptapEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, setContent }) => {
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      ListItem,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  const toolbarButtons = [
    { label: "Bold", action: () => editor.chain().focus().toggleBold().run() },
    { label: "Italic", action: () => editor.chain().focus().toggleItalic().run() },
    { label: "Strike", action: () => editor.chain().focus().toggleStrike().run() },
    { label: "Code", action: () => editor.chain().focus().toggleCode().run() },
    { label: "Bullet list", action: () => editor.chain().focus().toggleBulletList().run() },
    { label: "Ordered list", action: () => editor.chain().focus().toggleOrderedList().run() },
    { label: "Quote", action: () => editor.chain().focus().toggleBlockquote().run() },
    { label: "Left", action: () => editor.chain().focus().setTextAlign("left").run() },
    { label: "Center", action: () => editor.chain().focus().setTextAlign("center").run() },
    { label: "Right", action: () => editor.chain().focus().setTextAlign("right").run() },
  ];

  const handlePost = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
        title,
        content,
      });
      console.log("Content saved:", response.data);
      alert("Content successfully posted!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to post content.");
    }
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto shadow-lg bg-white rounded-lg overflow-hidden">
      {/* Title Input */}
      <div className="p-6 bg-gray-100 border-b border-gray-300">
        <input
          type="text"
          placeholder="Enter your blog title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 text-lg font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-4 bg-gray-100 border-b border-gray-300">
        {toolbarButtons.map((button, idx) => (
          <button
            key={idx}
            className="px-3 py-1.5 rounded-md text-sm font-medium transition bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={button.action}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="p-6 text-base min-h-[400px] bg-gray-50 [&>h1]:text-xl [&>h1]:mt-14 [&>h1]:mb-6 [&>h2]:text-lg [&>h2]:mt-14 [&>h2]:mb-6 [&>h3]:text-base [&>ul]:pl-4 [&>ol]:pl-4 [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:my-6 [&>hr]:border-t [&>hr]:border-gray-200 [&>pre]:bg-black [&>pre]:text-white [&>pre]:rounded [&>pre]:p-4 [&>pre]:text-sm [&>code]:bg-purple-200 [&>code]:rounded [&>code]:text-black [&>code]:text-xs [&>code]:p-1"
      />

      {/* Post Button */}
      <div className="p-4 flex justify-center bg-gray-100 border-t border-gray-300">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-200"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default TiptapEditor;
