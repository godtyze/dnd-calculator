import React from 'react';
import './button.scss';
interface ButtonProps {
  className?: string;
  children: React.ReactNode | string;
  onClick?: () => void;
  draggable?: boolean;
}

const Button: React.FC<ButtonProps> = ({children, ...rest}) => {
  return (
    <button {...rest}>
      {children}
    </button>
  );
};

export default Button;