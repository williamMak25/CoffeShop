import React, { useContext, useEffect, useState } from 'react'
import {createUserWithEmailAndPassword,onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../src/firebase/firebase';
import {v4 as uuidV4} from 'uuid'

const userContext = React.createContext();

export const useData = () =>{
    return useContext(userContext)
}

export const Context = ({children}) => {
    const [userData,setUserData] = useState();
    const [currentUser,setCurrentUser] = useState();
    const [products,setProducts] = useState();
    const [drink,setDrink] = useState();
    const [userOrderHistory,setUserOrderHistory] = useState();
    let filterItem = JSON.parse(localStorage.getItem("cartItem")) ? JSON.parse(localStorage.getItem("cartItem")) : [];
    const [ite,setIte] = useState();

useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        if(user){
            setCurrentUser(user)
        }else{
            console.log('no user found')
        }
    }) 

    fetch('http://localhost:3004/user')
    .then( res => { return res.json()})
    .then( data => { 
        setUserData(data);
    });
    
    fetch('http://localhost:3004/food')
    .then( res => {return res.json()})
    .then( data => setProducts(data));

    fetch('http://localhost:3004/drink')
    .then( res => { return res.json()})
    .then( data => setDrink(data))

    fetch('http://localhost:3004/order')
    .then(res => {return res.json()})
    .then((data) => {
        if(data){
            setUserOrderHistory(data)
        }
    })
},[setUserOrderHistory])

const register = (email,password) =>{

 createUserWithEmailAndPassword(auth,email,password)
.then((userCredential) => { 
  
}).catch( err => console.log(err.message))}

const Userinfo = (info)=>{
        fetch('http://localhost:3004/user',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({...info,"id":uuidV4()})
    })
}

const signIn = async(email,password) => {

await signInWithEmailAndPassword(auth,email,password)
    .then( cre => {
        console.log(cre.user)
    }).catch( err => console.log(err))
}

const additem = (id,item) => {
    
    const itemIndex = filterItem.findIndex( items => items.id === id);
    if(itemIndex >= 0){   
        filterItem[itemIndex].itemQ += 1;
    }else{
        const temp = {...item,itemQ:1};
        filterItem.push(temp)
    }
    localStorage.setItem('cartItem',JSON.stringify(filterItem))
    setIte(filterItem)

}

const reduceitem = (id,item) => {

    const itemIndex = filterItem.findIndex( items => items.id === id);
    if(filterItem[itemIndex].itemQ > 1){
        filterItem[itemIndex].itemQ -= 1;
    }else if(filterItem[itemIndex].itemQ === 1){
        const remainItems = filterItem.filter( items => items.id !== id);
        filterItem = remainItems
        console.log(remainItems)
    }
    localStorage.setItem('cartItem',JSON.stringify(filterItem));
    setIte(filterItem)
}

const updateOrder = (allitem,totalPrice)=> {
    const time = new Date().toLocaleString()
    fetch('http://localhost:3004/order',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            "ordered_items":allitem,
            "total_price":totalPrice,
            "order_time": time,
            "customer_email":currentUser.email,
            "order_id":uuidV4()  
        })
    }).then( res => {
        console.log(res.status)
    }).catch( error => console.log(error.message))

}



const value = {
    register,
    signIn,
    userData,
    products,
    additem,
    reduceitem,
    drink,
    updateOrder,
    currentUser,
    userOrderHistory,
    Userinfo
};

return (
    <userContext.Provider value={value}>
        {children}
    </userContext.Provider>
  )
}
