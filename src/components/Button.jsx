import React from 'react'

function Button({
    children,
    type='button',
    textColor='text-white',
    bgColor='bg-black',
    className='',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button
