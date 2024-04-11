import React from 'react';

const Box = ({ title, children }) => {
  return (
    <div className="box">
      <h2>{title}</h2>
      <ul>{children}</ul>
    </div>
  );
};

export default Box;
