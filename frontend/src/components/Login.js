/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import {useState} from 'react'

import xss from 'xss'
import {navigate} from '@reach/router'
import { shouldInclude } from 'apollo-utilities'

const Login = ({ setLoggedin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')       

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
     

        setEmail(xss(email))
        setPassword(xss(password))      

        const url = 'http://localhost:3001/login'
        const options = {
            method: 'post',
            headers:{
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: `email=${email}&password=${password}`,            
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
                //document.cookie = 'token=' + data.token
                document.cookie = 'signedin=true' 
                setLoggedin(true)
                navigate('/add-activity')
            }
        })
    }

    return(
        <form className="Login"  css={css`
            display: grid;
            grid-template-rows: 250px 100px auto;
            max-width: 1000px;
            margin: 0 auto;
        `} onSubmit={doLogin}>
            <div css={css`
                display: grid;
                grid-template-rows: 100px 100px;
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
            </div>
            <div  css={css`
                    @media (max-width: 800px){
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                       }
                `}>
                <button  className="loginButton" type="submit"> Login </button>
            </div>
        </form>

    )
  }

  export default Login