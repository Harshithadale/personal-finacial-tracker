import React from 'react'
import './style.css'

function Input({label,state,setState,placeholder,type}) {
  return (
    <div className='input-wrapper'>
        <p className='label-input'>{label}</p>
        <input className='custom-input' placeholder={placeholder} value={state} type={type} onChange={(e) => setState(e.target.value)}/>
    </div>
  )
}
export default Input