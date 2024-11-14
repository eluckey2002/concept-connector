import { forwardRef } from 'react'
import { ButtonProps, ButtonVariant } from '@/types/types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, onClick, children, icon: Icon, isActive, disabled, className = '', ...props }, ref) => {
    const baseStyles = 'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transform'
    
    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium shadow-lg shadow-purple-600/20',
      secondary: 'bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-3',
      mode: `px-3 py-1.5 rounded-md text-sm whitespace-nowrap flex items-center gap-1.5 
        ${isActive 
          ? 'bg-purple-600/30 text-purple-300 border border-purple-500 shadow-lg shadow-purple-500/20' 
          : 'bg-gray-800 text-gray-400 hover:bg-gray-700/80'}`,
      special: 'bg-gray-800/50 text-purple-300 border border-purple-500/30 hover:bg-gray-700/80'
    }

    const hoverStyles = !disabled ? 'hover:scale-105 active:scale-95' : ''
    
    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${hoverStyles}
          ${className}
        `}
        type="button"
        {...props}
      >
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'