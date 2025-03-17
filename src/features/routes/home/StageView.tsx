//中央ステージ一覧
import React from "react";

export default function StageView() {
  return (
    <div>
      <h1>ステージ一覧</h1>
      <div style={containerStyle}>
        <button style={buttonStyle}>Stage 1</button>
        <button style={buttonStyle}>Stage 2</button>
        <button style={buttonStyle}>Stage 3</button>
        <button style={buttonStyle}>Stage 4</button>
        <button style={buttonStyle}>Stage 5</button>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: '50px 50px',
  gridTemplateRows: '50px 50px 50px',
  gap: '10px',
  alignItems: 'center',
};

const buttonStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  textAlign: 'center',
  lineHeight: '50px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer'
};
