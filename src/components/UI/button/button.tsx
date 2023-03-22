import React from 'react';
import './button.scss';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  draggable?: boolean;
  active?: boolean;
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
                                                                  children,
                                                                  active,
                                                                  className,
                                                                  ...rest
                                                                }) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.currentTarget.click();
    }
  }

  return (
    <div role='button' onKeyDown={onKeyDown} tabIndex={0} className={active ? className + ' active' : className} {...rest}>
      {children}
    </div>
  );
};

export default Button;