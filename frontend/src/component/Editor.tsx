import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";

interface ToolbarButtonProps {
  content: string;
  setContent: (content: string) => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  content,
  setContent,
}) => (
  <button
    className="px-3 py-1.5 rounded-md text-sm font-medium transition bg-gray-200 text-gray-700 hover:bg-gray-300"
    onClick={() => setContent(content)}
  >
    {content}
  </button>
);

interface TiptapEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
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
    "Bold",
    "Italic",
    "Strike",
    "Code",
    "Bullet list",
    "Ordered list",
    "Quote",
    "Left",
    "Center",
    "Right",
  ];

  return (
    <div className="flex flex-col max-w-3xl mx-auto shadow-md bg-white rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-4 bg-gray-100 border-b border-gray-300">
        {toolbarButtons.map((label, idx) => (
          <ToolbarButton key={idx} content={label} setContent={setContent} />
        ))}
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="p-6 text-base min-h-[400px] bg-gray-50"
      />

      {/* Post Button */}
      <div className="p-4 flex justify-center bg-gray-100 border-t border-gray-300">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-200"
          onClick={() => console.log("Post submitted:", content)}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default TiptapEditor;
