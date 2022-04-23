import React, { useState } from 'react';
import Axios from 'axios';
import GetEvents from "./GetEvent"

function Events({email}){
  const url = "https://2692-125-63-30-25.au.ngrok.io/create-event"
  const [data,setData] = useState({
    //add
    EventName:"",
    EventDesc:"",
    EventDate:"",
    userCreator:"",
    participants:[] 
  })

  function submit(e){
    e.preventDefault();
    let partilist = data.participants.split(",")
    partilist.push(data.userCreator)
    console.log(partilist)
    Axios.post(url,{
      //add
      name:data.EventName,
      description: data.EventDesc,
      date:data.EventDate,
      email:data.userCreator,
      users:partilist
    })
      .then(res=>{
        

        console.log(res.data)
      })
  }

  function handle(e){
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  return(
    <div className='flexbox'>
      <div className='eventform'>
        <h2>Add New Event</h2>
        <br></br>
        <form onSubmit={(e)=> submit(e)}>
          {/* add */}
          <input onChange={(e)=>handle(e)} id ="EventName" value = {data.EventName} placeholder='Event Name' type="text"></input>
          <input onChange={(e)=>handle(e)} id ="EventDesc" value = {data.EventDesc} placeholder='Event Description' type="text"></input>
          <input onChange={(e)=>handle(e)} id ="EventDate" value = {data.EventDate} placeholder='Event Date' type="date"></input>
          <input onChange={(e)=>handle(e)} id ="userCreator" value = {data.userCreator} placeholder='Event Creator' type="text"></input>
          <input onChange={(e)=>handle(e)} id ="participants" value = {data.participants} placeholder='Participants' type="text"></input>
          <p className='fourth_p'>* Input Multiple People: separate by commas and no spaces in between</p>
          <button className='buttonsubmit'>Submit</button>
        </form>
      </div>

      <div className='eventresponses'>
        <GetEvents email={email}/>
      </div>
    </div>
  );
}

export default Events;