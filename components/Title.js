import React from 'react'

const Title = ({children, className}) => {
  return (
    <h2 className={`${className} uppercase text-regal-red font-bold text-2xl text-center`}>{children}</h2>
  )
}

export default Title