import React, { useState } from 'react';
import './styling/inPutfield.scss';
import './styling/Calculator.scss';
import './styling/btns.scss'


export default function Calculator(props){
    const [userInput, setUserInput] = useState('')
    const [operator,setOperator]= useState('')
    const [equationNumbers,setEquationNumbers] = useState([])
    const [result, setResult]= useState(0)
    const [inputerrorMessage, setInputErrorMessage] = useState('');
    const [placeholder, setPlaceholder] = useState('Enter Number');


    function handleOnChange(e){ 
        if (isNaN(e.target.value)) {
            setInputErrorMessage('Sorry, you can only type numbers');
            clearAllData();
          } else {
            setUserInput(e.target.value);
            setInputErrorMessage('');
            setPlaceholder('Enter the number');
          }
    }       

    /* clear all the data */
    function clearAllData(){
        setEquationNumbers([]);
        setOperator('');
        setUserInput('');    
    }

    /** Handle error functions */
    /** handle pressing on operation and the input field is clear */
    function repeatPressingOperation(ErrorMessage){
        let ErrorSpan =  document.getElementById('error');
        try{
            if(userInput === ''){clearAllData(); throw ErrorMessage}; 
        }catch(err){
            ErrorSpan.innerHTML = err;
        };
    }  
      
    /* doing the operation + - * / **/
    function Calculate(operator){ 
        let product = 0;
        switch (operator) {
            case '+':
              product = equationNumbers[0] + equationNumbers[1];
              break;
            case '-':
              product = equationNumbers[0] - equationNumbers[1];
              break;
            case '/':
              product = equationNumbers[0] / equationNumbers[1];
              break;
            case '*':
              product = equationNumbers[0] * equationNumbers[1];
              break;
            default:
              break;
          }
        setResult(product);
        setUserInput(product.toString());
        setEquationNumbers(product);
        setOperator('');
    }


    /* handle operation either on keyBoard or calculator bad */
    function handleOperation(e, operator) {
        e.preventDefault();
        repeatPressingOperation(`Error: please stop spamming operation`);    
        setOperator(operator);
        equationNumbers.push(Number(userInput));
        setUserInput('');
      }
    
    function handlePressingEnterKeyOrEquallButton(e){
        e.preventDefault();
        repeatPressingOperation('you did not enter any number please try again');
        equationNumbers.push(Number(userInput));
        setUserInput(''); 
        Calculate(operator);
        clearAllData();     
    }


    /* handle the user input inside the input field and doing operations such:+, - , /.*/
    function handleKeyDown(e){
        switch (e.key) {
            case '+':
            case '-':
            case '*':
            case '/':
              handleOperation(e, e.key);
              break;
            case 'Enter':
              handlePressingEnterKeyOrEquallButton(e);
              break;
            default:
              break;
          }      
    }

    /* keyBoard */
    function handleClickOnNumbersAndDotBtns(e){
        setUserInput(String(userInput).concat(e.target.name));
    }
    function handleClickOnSignChangeBtn(){
        setUserInput(userInput * -1);   
    }

    return(
        <div className='Calculator-Container'>
            <form>
                {/* input field */}
                <div className='input-field-container'>
                    <label>
                    <div className='spans'>
                    <span>Result is {result}</span>
                    <span id='show-input'> you've typed : {equationNumbers[0]} {operator} {equationNumbers[1]}</span>
                    <span id='error'></span>
                    <span id="Typing-error">{inputerrorMessage}</span>
                    </div>
                        <input
                         id = 'Calculator-input-field'
                         onKeyDown={handleKeyDown}
                         onChange={handleOnChange}
                         value={userInput}
                         placeholder={placeholder}
                         type='text' step='0.1' min="0" max="100000000"/>                       
                    </label>
                </div>
                <div className='Calculator-keyboard'> 
                    <button type='button' onClick={()=>{setResult(userInput/100);setUserInput('');}}name='x/100'>1/100</button>
                    <button type='button' onClick={()=>{setResult(Math.pow(userInput,1/3));setUserInput('');}}name='RootPowerOf3'>&#8731;</button>
                    <button type='button' onClick={()=>clearAllData()}name='C'>C</button>
                    <button type='button' onClick={()=>setUserInput(userInput.slice(0,-1))}name='Del'>Del</button>
                    <button type='button' onClick={()=>{setResult(1/userInput);setUserInput('');}}name='1/x'>1/x</button>
                    <button type='button' onClick={()=>{setResult(userInput*userInput);setUserInput('')} }name='&#178;'>x<sup>2</sup></button>
                    <button type='button' onClick={()=>{setResult(Math.sqrt(userInput));setUserInput('')}}name='SquareRoot'>&#8730;x</button>
                    <button type="button" onClick={(e) => handleOperation(e, '/')} name="/">/</button>
                    <button type='button' onClick={handleClickOnNumbersAndDotBtns} name='7'>7</button>
                    <button type='button' onClick={handleClickOnNumbersAndDotBtns} name='8'>8</button>
                    <button type='button' onClick={handleClickOnNumbersAndDotBtns} name='9'>9</button>
                    <button type="button" onClick={(e) => handleOperation(e, '*')} name="*">X</button>
                    <button type='button' onClick={handleClickOnNumbersAndDotBtns} name='4'>4</button>
                    <button type='button' onClick={handleClickOnNumbersAndDotBtns} name='5'>5</button>
                    <button type='button' onClick={handleClickOnNumbersAndDotBtns} name='6'>6</button>
                    <button type="button" onClick={(e) => handleOperation(e, '-')} name="-">-</button>
                    <button type='button' onClick={handleClickOnNumbersAndDotBtns} name='1'>1</button>
                    <button type='button' onClick={handleClickOnNumbersAndDotBtns} name='2'>2</button>
                    <button type='button' onClick={handleClickOnNumbersAndDotBtns} name='3'>3</button>
                    <button type="button" onClick={(e) => handleOperation(e, '+')} name="+">+</button>
                    <button type='button' onClick={handleClickOnSignChangeBtn}name='%'>+/-</button>
                    <button type='button' onClick={handleClickOnNumbersAndDotBtns} name='0'>0</button>
                    <button type='button' onClick={handleClickOnNumbersAndDotBtns} name='.'>.</button>  
                    <button type='button' onClick={handlePressingEnterKeyOrEquallButton}name='Calculate'>=</button>
                </div>
            </form>
        </div>
    );
}