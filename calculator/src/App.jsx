
import { useReducer } from 'react'
import './App.css'
import DigitButton from './Components/DigitButton'
import OperationButton from './Components/OperationButton'

export  const ALL_ACTIONS={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPEARTION:'choose-operation',
  DELETE_ALL:'delete-all',
  DELETE_SINGLE_DIGIT:'delete-single-digit',
  EVALUATE:'evaluate'
}
const INITIAL_STATE={
  currentOperand:'',
  previousOperand:'',
  operation:''
}
const reducerFunction=(state=INITIAL_STATE,action)=>{
  switch(action.type){
    case 'add-digit':
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currentOperand:action.payload.digit
        }
      }
      if(state?.currentOperand.includes('.') && action.payload.digit==='.'){
        return state
      }
      if(state.currentOperand==="0" && action.payload.digit==="0"){
        return state
      }
     
      return {
        ...state,
        currentOperand:`${state.currentOperand}${action.payload.digit}`
      }
    case 'choose-operation':
      if(state.currentOperand==='' && state.previousOperand===''){
        return INITIAL_STATE
      }
      if(state.currentOperand===''){
        return {
          ...state,
          operation:action.payload.operation
        }
      }
      if(state.previousOperand===''){
        return {
          ...state,
          previousOperand:state.currentOperand,
          operation:action.payload.operation,
          currentOperand:''
        }
      }
      return {
        ...state,
        operation:action.payload.operation,
        previousOperand:evaluate(state),
        currentOperand:''
      }

    case 'delete-all':
      return INITIAL_STATE
    case 'delete-single-digit':
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currentOperand:''
        }
      }
      if(state.currentOperand===''){
        return INITIAL_STATE
      }
      if(state.currentOperand.length===1){
        return {
          ...state,
          currentOperand:''
        }
      }
      return {
        ...state,
        currentOperand:state.currentOperand.slice(0,-1),

      }
    case 'evaluate':
      if(state.currentOperand===''||state.previousOperand===''||state.operation===''){
        return INITIAL_STATE
      }
      return {
        ...state,
        previousOperand:'',
        currentOperand:evaluate(state),
        operation:'',
        overwrite:true
      }
  }

}

function evaluate(state){
  const previousValue=parseFloat(state.previousOperand)
  const currentValue=parseFloat(state.currentOperand)
  if(isNaN(previousValue)||isNaN(currentValue)){
    return
  }
  let result=''
  switch(state.operation){
    case "+":
      result=previousValue+currentValue
      break
    case "-":
      if(previousValue>currentValue){
        result=previousValue-currentValue

      }
      result=currentValue-previousValue
     
      break
    case "*":
      result=previousValue * currentValue
      break
    case "/":
      result=previousValue / currentValue
      break

  }
  return result.toString()
}

const INTEGER_FORMATTER=new Intl.NumberFormat('en-us',{
  maximumFractionDigits:0
})

function operandFormatter(operand){
  if(operand===''){
    return
  }
  const [integer,decimal]=operand.split('.')
  if(decimal==null){
    return INTEGER_FORMATTER.format(integer)

  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  

}


function App() {
 
  const [state,dispatch]=useReducer(reducerFunction,INITIAL_STATE)
 
 

  return (
<div className="calculator-grid">
      <div className="output"id='display'>
        <div className="previous-operand">
          {operandFormatter(state.previousOperand)}{state.operation}
          
        </div>
        <div className="current-operand">
          {operandFormatter(state.currentOperand)}
        </div>
      </div>
      <button
        className="span-two"
        id='clear'
        onClick={()=>dispatch({type:ALL_ACTIONS.DELETE_ALL})}
        
      >
        AC
      </button>
      <button onClick={()=>dispatch({type:ALL_ACTIONS.DELETE_SINGLE_DIGIT})} >
        DEL
      </button>
      <OperationButton operation="÷" id='divide'dispatch={dispatch}/>
      <DigitButton digit="1" id='one'dispatch={dispatch} />
      <DigitButton digit="2" id='two' dispatch={dispatch}/>
      <DigitButton digit="3" id='three' dispatch={dispatch}/>
      <OperationButton operation="*" id='multiply'dispatch={dispatch} />
      <DigitButton digit="4" id='four'dispatch={dispatch} />
      <DigitButton digit="5" id='five'dispatch={dispatch} />
      <DigitButton digit="6" id='six' dispatch={dispatch}/>
      <OperationButton operation="+" id='add' dispatch={dispatch}/>
      <DigitButton digit="7" id='seven' dispatch={dispatch}/>
      <DigitButton digit="8"  id='eight'dispatch={dispatch}/>
      <DigitButton digit="9" id='nine' dispatch={dispatch}/>
      <OperationButton operation="-" id='subtract'dispatch={dispatch}/>
      <DigitButton digit="." id='decimal'dispatch={dispatch}/>
      <DigitButton digit="0" id='zero'dispatch={dispatch} />
      <button
        className="span-two"
        id='equals'
        onClick={()=>dispatch({type:ALL_ACTIONS.EVALUATE})}
       
      >
        =
      </button>
    </div>
  )
}

export default App
