import React from 'react'

import './spinner-loading.css'

export const SpinnerLoading = ({ width = '36px', height = '36px' }) => {
  return (
    <div 
      className="spinner-loading"
      style={{ width, height }}
    />
  )
}