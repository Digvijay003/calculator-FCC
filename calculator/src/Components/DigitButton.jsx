import React from 'react'
import { ALL_ACTIONS } from '../App'

export default function DigitButton({digit,id,dispatch}) {
   
  return (
    <button id={id} onClick={()=>dispatch({type:ALL_ACTIONS.ADD_DIGIT,payload:{digit:digit}})}>
        {digit}

    </button>
  )
}
