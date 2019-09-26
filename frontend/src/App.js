import React, {useState, useEffect} from 'react';
import './App.css';
import Homepage from './components/Homepage'
import AddActivity from './components/AddActivity'
import Activities from './components/Activities'
import {openDB} from 'idb'

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

const storeActivity = async (activity) => {
  const db = await initDatabase()
  const tx = await db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)
  await store.put(activity)
  await tx.done
}

const App = () => {
  const [screen, setScreen] = useState('activities')
  const [activities, setActivities] = useState([])
  
  useEffect(() => {
    (async () => {
        const activities = await initActivities()
        setActivities(activities)
    })();
  }, [])  

  return (
    <div className="App">
      {screen === 'homepage' && <Homepage setScreen={setScreen}/>}
      {screen === 'addActivity' && <AddActivity storeActivity={storeActivity} setScreen={setScreen}/>}
      {screen === 'activities' && <Activities setScreen={setScreen} activities={activities}/>}
    </div>
  );
}

export default App;
