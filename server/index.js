// usamos import por que es js module sintax, pero
// usamos require en el lado del server que es el js comun

// npm init --y 
// npm install express apollo-server-express bcrypt jsonwebtoken cors
// npm install xss
// npm install -g nodemon  
// npm install graphql
// npm install cookie-parser

/**  para iniciar el server -> nodemon index.js -----------*/

const xss = require('xss')

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const {
    ApolloServer,
    gql,
    AuthenticationError
} = require('apollo-server-express')

const SECRET_KEY = 'y4m3rit0m4n1t0'

const users = [{
    email: 'your@email.com',
    password: '$2y$10$3Il0HdyaiucwLUjaQ5b.feci7ipjChx2DpE5BemX.BVIjuJwkjL7u' // ssecrett
}]

const activities= [	
        {
         title: "Work Party - Good bye Subse Lily Murisi", 
         location: {lat: -38.988368562404126, lng: -67.99275398254396}, 
         description: "Buena fiesta para despedir el año y muchas cosas mas", 
         dateTime: '02-11-2019T21:15:00Z'
        },
        {
         title: "Going to Park", 
         location: {lat: 51.49324784798508, lng: -0.05287170410156251}, 
         description: "<p>We went to the park the last saturday</p>", 
         dateTime: '12-12-2019T17:00:00Z'
        },
        {
         title: "Play Basketball", 
         location: {lat: -38.95330170738426, lng: -68.05416584014894}, 
         description: "<p>Play with La Colonia vs Deluxe</p>", 
         dateTime: '18-10-2019T22:30:00Z'
        }            
]

// se define el esquema
const typeDefs = gql`
    type Location {
        lat: String!
        lng: String!
    }

    type Activities {        
        title: String!
        description: String!
        datetime: String!
        location:  Location      
    } 

    type Query {
        activities: [Activities]
    }
`
// Error: "Query" defined in resolvers, but not in schema, debo agregar type query en  schema
// definimos los resolvers
const resolvers = {
    Query: {
        activities: (root, args) => {
            return activities
        }
    }
}

// definimos el context para chequear que el usuario está autorizado
const context = ({ req }) => {
    
    // const token = req.headers.authorization || ''   // lo comento por que ahora obtengo por req.cookies
    const token = req.cookies['token'] || ''
    try {        
        const { email } = jwt.verify(token.split(' ')[1], SECRET_KEY)
    }catch(err) {
        throw new AuthenticationError('Authentication error, JWT invalid')
    }
}

// iniciamos el apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    cors: false  // deshabilito cors en apollo
})

const app = express()
// con este middleware se conecta express con apollo

server.applyMiddleware({ app, cors:false })

//middleware
const corsOptions = {     
    credentials: true,
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))

const getToken = email => {    
    return token = jwt.sign({
        email: email,         
    }, SECRET_KEY)    
}

app.post('/register', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body
    
    //const theUser = users.find( user => { return user.email === email }) idem sin return
    const theUser = users.find( user => user.email === email)        

    if (theUser){
        // cod 400 - bad request
        res.status(400).send({
            succes: false,
            message: 'Ya existe ese mail registrado: {$email}'
        })
    return
    }
    
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
        email: xss(email),
        password: xss(passHash)
    })

    console.log(users)

    // antes de envíar true, hay que setear la cookie
    res.cookie('token', getToken(email), 
        {httpOnly: true
         //,secure:true
    })

    res.send({
        succes: true 
        //,token: getToken(email)
    })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    //const theUser = users.find( user => { return user.email === email }) idem sin return
    const theUser = users.find( user =>  user.email === email )

    if (!theUser){
        // cod 404 - not found
        res.status(404).send({
            succes: false,
            message: 'Email not found: {$email}'
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
    
    // antes de envíar true, hay que setear la cookie
    res.cookie('token', getToken(email), 
        {httpOnly: true
         //,secure:true
    })

    res.send({
        succes: true 
        //,token: getToken(email)
    })
})

app.listen(3001, () =>
    console.log('Server listening on port 3001')
)