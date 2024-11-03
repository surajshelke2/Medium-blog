import React, { useEffect, useState } from "react";
import TiptapEditor from "../../component/Editor";
import { AppBar } from "../../component/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Publish: React.FC = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!content) {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/v1/blog`);
          setContent(res.data.content); 
        } catch (error) {
          console.error("Error fetching blog content:", error);
        }
      }
    };
    
    fetchData();
  }, [content]);

  return (
    <>
      <AppBar here={1} />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-6 text-center">
          Blog Editor
        </h1>
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-6 mb-10">
          <TiptapEditor content={content} setContent={setContent} />
        </div>
      </div>
    </>
  );
};

export default Publish;
