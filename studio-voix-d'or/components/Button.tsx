import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'solid', children, className = '', ...props }) => {
  const baseStyles = "relative px-8 py-3 font-display uppercase tracking-[0.2em] text-sm font-bold transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    solid: "bg-gold-500 text-black hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]",
    outline: "border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
