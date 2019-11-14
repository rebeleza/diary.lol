// npm install js-cookie 
// npm install apollo-client apollo-link-http apollo-cache-inmemory react-apollo apollo-link-context  apollo-boost graphql graphql-tag
import React, {useState, useEffect} from 'react'
import './App.css'

import Homepage from './components/Homepage'
import AddActivity from './components/AddActivity/AddActivity'
import Activities from './components/Activities'
import Login from './components/Login'
import Register from './components/Register'

import {openDB} from 'idb'
import {Router} from '@reach/router'
import Cookies from 'js-cookie'

import { ApolloClient} from 'apollo-client'
import { HttpLink} from 'apollo-link-http'
import { InMemoryCache} from 'apollo-cache-inmemory'
import { ApolloProvider} from 'react-apollo'
import { setContext } from 'apollo-link-context'
//import gql from 'graphql-tag'

const httplink = new HttpLink ({
  uri: 'http://localhost:3001/graphql'
})

// pasar la autorización
const authLink = setContext((_,{headers} ) => {
  return {
      headers: {
        ...headers,
        authorization: `Beearer ${Cookies.get('token')}`
      }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httplink),
  cache: new InMemoryCache()
})

const storeName = 'activities'

const initDatabase = async () => {
  const dbName = 'diary.lol'  
  const version = 1 
  const db = await openDB(dbName, version, {
    upgrade(db, oldVersion, newVersion, transaction) {
       db.createObjectStore(storeName, { autoIncrement:true })      
    }    
  }) 
  
  return db
}

const initActivities = async () => {
  const db = await initDatabase()
  const tx = await db.transaction(storeName, 'readonly')
  const activities = tx.objectStore(storeName).getAll()
  await tx.done
  
  return activities
}

const initKeys = async () => {
  const db = await initDatabase()
  const tx = await db.transaction(storeName, 'readonly')
  const keys = tx.objectStore(storeName).getAllKeys()
  await tx.done
  
  return keys
}

const getActivities = async () => {
  let activities = await initActivities()
  let keys = await initKeys()

  activities.forEach((activity, index) =>{
    activity.key = keys[index]
  })
  
  //ordernar las actividades
  activities = activities.sort((b,a) => {
    return new Date(b.dateTime) - new Date(a.dateTime)
  })
  

  return activities
}

const storeActivity = async (activity) => {
  const db = await initDatabase()
  const tx = await db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)
  await store.put(activity)
  await tx.done
}

const deleteActivity = async key => {
  const db = await initDatabase()
  const tx = await db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)
  await store.delete(key)
  await tx.done
}

const App = () => {
  const [activities, setActivities] = useState([])
  const [loggedin, setLoggedin] = useState(!!Cookies.get('token'))
  
  const reloadActivities = async () => {
    const reloadActivities = await getActivities()
    setActivities(reloadActivities)
  }
  useEffect(() => {
    (async () => {
      reloadActivities()
    })();
  }, [])  

  return (
    <div className="App">
      <ApolloProvider client= {client}>
            <Router>
                {<Homepage path="/"/>}
                
                {<AddActivity comingFromHomePage 
                              storeActivity={storeActivity}                      
                              reloadActivities={reloadActivities} 
                              path="add-first-activity"/>}
                
                {<AddActivity storeActivity={storeActivity}
                              reloadActivities={reloadActivities}
                              path="add-activity"/>}

                {<Register loggedin={loggedin} 
                        setLoggedin={setLoggedin}
                        path='register'/>}

                {<Login loggedin={loggedin} 
                        setLoggedin={setLoggedin}
                        path='login'/>}

                {<Activities activities={activities} 
                            reloadActivities={reloadActivities} 
                            deleteActivity={deleteActivity}
                            loggedin={loggedin}
                            path="activities/*"/>}
            </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
