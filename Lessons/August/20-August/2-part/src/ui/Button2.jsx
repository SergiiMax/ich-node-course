import React from 'react';

const Button = (props) => {
    const {className,type,size, variant, onClick, children} = props
  return (
    <button>{children}</button>
  );
};

export default Button;