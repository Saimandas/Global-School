import React from 'react'
const buttonVariants = {
  primary:"bg-primary text-primary-foreground hover:opacity-90 rounded-md px-5 py-2.5 font-semibold transition-all duration-300 shadow-sm",
  secondary:"bg-secondary text-secondary-foreground hover:opacity-90 rounded-md px-5 py-2.5 font-semibold transition-all duration-300 shadow-sm",
  outline:"border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground rounded-md px-5 py-2.5 font-semibold transition-all duration-300",
};
    
const Button = ({children,variant="secondary",type="button",className,onClick=()=>{},...props}) => {

  return (
    <button className={`${buttonVariants[variant]} ${className}`} {...props} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button