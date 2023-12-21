// import React from "react";
import {
  MdCancel,
  MdDelete,
  MdEdit,
  MdOutlineDoneOutline,
} from "react-icons/md";
import { IoColorPalette } from "react-icons/io5";
import "./styles.css";
import { useState, useEffect } from "react";
import { ChromePicker } from "react-color";

const Note = ({ title, content, id, handleDelete, handleUpdateText }) => {
  const [ShowText, setShowText] = useState(false);
  const [editTaskTitle, setEditTaskTitle] = useState(title);
  const [editTaskContent, setEditTaskContent] = useState(content);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(() => {
    // Read the color from local storage on component mount
    const storedColor = localStorage.getItem(`noteColor_${id}`);
    return storedColor || "#ffffff";
  });

  // Save the color to local storage when it changes
  useEffect(() => {
    localStorage.setItem(`noteColor_${id}`, color);
  }, [color, id]);
  ///

  return (
    <div className="note" style={{ background: `${color}` }}>
      {ShowText ? (
        <>
          <input
            className="form-input"
            type="text"
            autoFocus
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
            style={{ background: `${color}` }}
          />
          <textarea
            className="form-textarea"
            type="text"
            value={editTaskContent}
            onChange={(e) => setEditTaskContent(e.target.value)}
            style={{ background: `${color}` }}
          />
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{content}</p>
        </>
      )}

      <button>
        <MdDelete size={25} onClick={() => handleDelete(id)} />
      </button>
      <button
        onClick={() => {
          ShowText ? setShowText(!ShowText) : setShowText(true);
          handleUpdateText(id, editTaskTitle, editTaskContent);
        }}
      >
        {ShowText ? <MdOutlineDoneOutline size={25} /> : <MdEdit size={25} />}
      </button>

      <button onClick={() => setShowColorPicker(false)}>
        {showColorPicker && <MdCancel size={25} />}
      </button>

      <button onClick={() => setShowColorPicker(true)}>
        {showColorPicker ? (
          <ChromePicker
            color={color}
            onChange={(updatedColor) => setColor(updatedColor.hex)}
          />
        ) : (
          <IoColorPalette size={25} />
        )}
      </button>
    </div>
  );
};

export default Note;
