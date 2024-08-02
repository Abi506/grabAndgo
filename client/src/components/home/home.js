import {Container,Image, Row} from 'react-bootstrap'
import axios from 'axios'
import cookie from 'js-cookie'
import { useDispatch } from 'react-redux'
import { addProfileImage } from '../../slices/profileSlice'
import {useState,useEffect} from 'react'

import HomeCarousel from '../homeCarousel/homeCarousel'
import MostRatedFoodCarousel from '../mostRated/mostRated'
import FoodMenu from '../foodMenu/foodMenu'

import Login from '../Login/login'

import './home.css'
const Home = () => {
const [data,setData]=useState([])

const dispatch=useDispatch()

const getProfileData=async()=>{
  try{
  const url="http://localhost:3001/user/profile"
  const token=cookie.get("jwt_id")
  const response=await axios.get(url,{
      headers:{
          Authorization:`Bearer ${token}`
      }
  })
  console.log(response.data,'response for profile')
  dispatch(addProfileImage(response.data.profileImageUrl))
}
catch(error){
  console.log("error while getting the profile",error)
  
}

}

const getData=()=>{
  const url="https://dummyjson.com/c/6fcb-5998-4db8-879d"
  axios.get(url)
  .then((response)=>{
    setData(response.data)
    
  })
  .catch((error)=>{
    console.log(error.message,"Error while fetching the data")
  })
}
useEffect(()=>{
  getData()
  getProfileData()
},[])
  return (
    <Container>
      <h1 className='general-text'>What's on your mind?</h1>
      <HomeCarousel/>
      <br/>
      <br/>
      <h1 className='general-text'>Top Rated Foods</h1>
      <br/>
      <MostRatedFoodCarousel mostRatedFoodData={data}/>
      <br/>
      <h1 className='general-text'>Featured Foods</h1>
      <br/>
      <FoodMenu/>
    </Container>
  )
}

export default Home
