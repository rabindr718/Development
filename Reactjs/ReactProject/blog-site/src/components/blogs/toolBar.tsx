import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const ToolBar: React.FC = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <JoditEditor
      ref={editor}
      value={content}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => {}}
    />
  );
};
export default ToolBar;
