import React from 'react';
import './button.scss';
interface ButtonProps {
  className?: string;
  children: React.ReactNode | string;
  onClick?: () => void;
  draggable?: boolean;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({children, active, className, ...rest}) => {
  return (
    <button className={active ? className + ' active' : className} {...rest}>
      {children}
    </button>
  );
};

export default Button;