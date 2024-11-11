import React, { useState } from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
        className={`
          peer w-full px-4 py-3 rounded-lg
          bg-gray-900 text-white text-lg
          border-2 outline-none transition-all duration-300
          placeholder-transparent
          ${isFocused 
            ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
            : 'border-gray-700 hover:border-gray-600'
          }
        `}
      />
      
      {/* Floating label */}
      <label className={`
        absolute left-2 px-2 
        pointer-events-none
        transition-all duration-300 ease-out
        ${isFocused || value
          ? '-top-2 text-sm text-purple-400 bg-gray-900'
          : 'top-3 text-base text-gray-400'
        }
        peer-focus:-top-2 
        peer-focus:text-sm 
        peer-focus:text-purple-400
        peer-focus:bg-gray-900
      `}>
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {/* Bottom border accent */}
      <div className={`
        absolute bottom-0 left-2 right-2 h-px
        transition-all duration-300
        ${isFocused ? 'bg-purple-500' : 'bg-transparent'}
      `} />
    </div>
  );
};