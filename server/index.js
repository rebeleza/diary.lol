// usamos import por que es js module sintax, pero
// usamos require en el lado del server que es el js comun

// npm install express apollo-server-express bcrypt jsonwebtoken cors
// npm install xss
// npm install -g nodemon  -> nodemon index.js
const xss = require('xss')

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const users = [{
    email: 'your@email.com',
    password: '$2y$10$3Il0HdyaiucwLUjaQ5b.feci7ipjChx2DpE5BemX.BVIjuJwkjL7u' // ssecrett
}]
const app = express()

//middleware

app.use(cors())
app.use(express.urlencoded({ extended: true }))

const getToken = email => {
    const SECRET_KEY = 'y4m3rit0m4n1t0'
    return token = jwt.sign({
        email: email,         
    }, SECRET_KEY)    
}

app.post('/register', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body
    
    //const theUser = users.find( user => { return user.email === email }) idem sin return
    const theUser = users.find( user => user.email === email)
    
    console.log(' the user: ' +theUser)

    if (theUser){
        // cod 400 - bad request
        res.status(400).send({
            succes: false,
            message: 'Ya existe ese mail registrado: {$email}'
        })
    return
    }
    
    // const match = bcrypt.compare(password, theUser.password)
    //bcrypt.hash       

    if (!email){
        res.status(401).send({
            succes: false,
            message: 'Please enter a Email'
        })  
        return
    }

    if(!password){        
        res.status(401).send({
            succes: false,
            message: 'Please enter a password'
        })        
        return
    }

    if(password.length < 8){
        res.status(411).send({
            succes: false,
            message: 'Please enter 8 chars in your password'
        })        
        return
    }

    if (password !== passwordConfirmation) {
        res.status(401).send({
            succes: false,
            message: 'Please enter the same value in both password fields'
        })
        return
    }
    // fin de chequeo

    //encripto la clave
    const rounds = 10
    const passHash = await bcrypt.hash(password, rounds) 
    
    //guardo user en array
    users.push({
        email: email,
        password: passHash
    })

    console.log(users)

    res.send({
        succes: true,
        token: getToken(email)
    })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    //const theUser = users.find( user => { return user.email === email }) idem sin return
    const theUser = users.find( user => { user.email === email })

    if (!theUser){
        // cod 404 - not found
        res.status(404).send({
            succes: false,
            message: 'No se pudo encontrar la cuenta: {$email}'
        })
        return
    }

    const match = bcrypt.compare(password, theUser.password)
    //bcrypt.hash
    if (!match) {
        res.status(401).send({
            succes: false,
            message: 'Incorrect credentials'
        })
        return
    }
    
    res.send({
        succes: true,
        token: getToken(theUser.email)
    })
})

app.listen(3001, () =>
    console.log('Server listening on port 3001')
)