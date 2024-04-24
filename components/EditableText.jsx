'use client'

import React, { useState, useRef, useEffect } from 'react';

const EditableText = ({ text, onEdit, postObject }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const inputRef = useRef(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEdit(editText);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    // onEdit(editText);
  };

//   useEffect(() => {
//     if (isEditing) {
//       inputRef.current.focus();
//       inputRef.current.setSelectionRange(editText.length, editText.length);
//     }
//   }, [isEditing]);

  console.log(editText)
  console.log(text)
//   console.log(postObject.promptSequeneTitle)

  return (
    <div style={{ display: 'inline-block', width: '100%' }}>
      {isEditing ? (
        <textarea
          rows={Math.max(1, Math.ceil(editText.length / 40))} // Adjust based on character count and desired width
          value={editText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          ref={inputRef}
          style={{ width: '100%', resize: 'none' }} // Disable textarea resizing
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{text}</span>
      )}
    </div>
  );
};

export default EditableText;
