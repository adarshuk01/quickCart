import React from 'react';
import { FiPlus } from 'react-icons/fi'; // Optional: replace with any icon

const Button = ({ label, onClick, variant = 'filled', icon: Icon }) => {
  const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all text-sm';

  const styles = {
    filled: 'bg-blue-600 hover:bg-blue-700 text-white',
    outlined: 'border border-blue-600 text-blue-600 ',
  };

  return (
    <button
      className={`${baseClasses} cursor-pointer   ${styles[variant]}`}
      onClick={onClick}
      type='button'
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
};

export default Button;
