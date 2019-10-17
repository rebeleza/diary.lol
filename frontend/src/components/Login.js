/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import {useState} from 'react'

import xss from 'xss'
import {navigate} from '@reach/router'

const Login = ({loggedin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    
    const doLogin = event => {    
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

        if( password !=  passwordConfirmation){
            alert('Please enter the same value in both password fields')
            return
        }

        setEmail(xss(email))
        setPassword(xss(password))
        setPasswordConfirmation(xss(passwordConfirmation))
        
        alert('Begin cap 27 - authentication')
        
    //     setDescription(xss(description))
    //     setTitle(xss(title))
        
    //     storeActivity({ title,location, description, dateTime })
    //     reloadActivities()        
         navigate('activities')
    }

    return(
        <form className="Login"  css={css`
            display: grid;
            grid-template-rows: 350px 100px auto;     
            max-width: 1000px;
            margin: 0 auto;                           
        `}>           
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
                <div  type="password" css={css`
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
            <div>
                <button  className="loginButton" onClick={doLogin}> Login </button>
            </div>               
        </form>
      
    )
  }

  export default Login