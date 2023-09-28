// BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css'
function BackButton() {
  const navigation = useNavigate();

  return (
    <button onClick={() => navigation('/')}>- - - Back to Home</button>
  );
}

export default BackButton;
