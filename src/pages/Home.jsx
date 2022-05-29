import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import User from '../components/User';
import { auth, db } from '../firebase'

const Home = () => {

  const[users, setUsers] = useState([]); 
  console.log(users)

  useEffect(() =>{
    const usersRef = collection(db, 'users');
    // console.log(usersRef);

    const q = query(usersRef, where('uid', 'not-in', [auth.currentUser.uid]));

    const unsub = onSnapshot(q, querySnapshot =>{
      // console.log(querySnapshot.docs[0].data());

      const data = querySnapshot.docs;
      let arr = [];
      data.map((user) =>{
        // setUsers([...users, user.data()])
        arr.push(user.data());
        console.log(user.data())
      })
      setUsers(arr);

    })
    // return () => unsub();
  },[])

  return (
    <div className='relative grid overflow-hidden h-96 w-full grid-cols-4 '>
      <div className='border-r-2 border-orange-700 overflow-y-auto space-y-8 pb-4'>
        {users.map((user) =>(
          <User key={user.uid} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Home 