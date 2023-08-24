import React from 'react'
import { ALL_ACTIONS } from '../App'

export default function OperationButton({operation,id,dispatch}) {
  return (
    <button id={id}onClick={()=>dispatch({type:ALL_ACTIONS.CHOOSE_OPEARTION,payload:{operation:operation}})}>
        {operation}

    </button>
  )
}
