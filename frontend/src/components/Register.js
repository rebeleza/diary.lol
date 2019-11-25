/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import {useState} from 'react'

import xss from 'xss'
import {navigate} from '@reach/router'

const Register = ({ setLoggedin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    
    const doRegister = event => {    
        event.preventDefault()

        if (!email){
            alert('Please enter a Email')
            return
        }

        if(!password){
            alert('Please enter a password')
            return
        }

        if(password.length < 8){
            alert('Please enter 8 chars in you password')
            return
        }

        if(!passwordConfirmation){
            alert('Please re-enter the password')
            return
        }

        if( password !==  passwordConfirmation){
            alert('Please enter the same value in both password fields')
            return
        }

        setEmail(xss(email))
        setPassword(xss(password))
        setPasswordConfirmation(xss(passwordConfirmation))
                
        const url = 'http://localhost:3001/register'
        const options = {
            method: 'post',
            headers:{
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: `email=${email}&password=${password}&passwordConfirmation=${passwordConfirmation}`,
            credentials: 'include'
        }

        fetch(url, options).then(response => {
            if (!response.ok){                
                if (response.status === 400) {
                    alert('Email already exist, please entry another')
                }
                if (response.status === 404) {
                    alert('Email not exist, please retry')
                }
                if (response.status === 401) {
                    alert('Error with email and password, please retry')
                }
            }
            return response
        })
        .then(response => response.json())
        .then(data => {
            if (data.succes) {
                //document.cookie = 'signed=true' + data.token      
                document.cookie = 'signed=true' 
                setLoggedin(true)                          
                navigate('/add-activity')
            }
        })         
    }

    return(
        <form className="Register"  css={css`
            display: grid;
            grid-template-rows: 350px 100px auto;     
            max-width: 1000px;
            margin: 0 auto;                           
        `}  onSubmit={doRegister}>           
            <div css={css`
                display: grid;
                grid-template-rows: 100px 100px 100px;     
                padding-top: 20px;                  
            `}>
                <div  css={css`
                    @media (max-width: 800px){
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                       }                   
                `}>                
                <input type="email" css={css`
                    padding: 20px;     
                    width: 370px;
                    font-size: 2rem;                       
                `} onChange={event => setEmail(event.target.value)}
                placeholder='Enter your email'/>            
                </div>                
                <div  css={css`
                    @media (max-width: 800px){
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                       }                   
                `}>                
                <input type="password" css={css`
                    padding: 20px;     
                    width: 370px;
                    font-size: 2rem;                       
                `} onChange={event => setPassword(event.target.value)}
                placeholder='Enter your password'/>            
                </div>                
                <div  css={css`
                    @media (max-width: 800px){
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                       }                   
                `}>                
                <input type="password" css={css`
                    padding: 20px;     
                    width: 370px;
                    font-size: 2rem;                       
                `} onChange={event => setPasswordConfirmation(event.target.value)}
                placeholder='Repit your password'/>            
                </div>                
            </div>   
            <div  css={css`
                    @media (max-width: 800px){
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                       }                   
                `}>
                <button  className="loginButton"  type="submit"> Register </button>
            </div>               
        </form>
      
    )
  }

  export default Register