import {useState,useEffect} from 'react'
import { Container} from 'react-bootstrap'
import cookie from 'js-cookie'
import { useDispatch } from 'react-redux'
import { addProfileImage } from '../../slices/profileSlice'
import axios from 'axios'
import './profile.css'

const Profile = () => {
    const [data,setData]=useState()
    const dispatch=useDispatch()

    useEffect(()=>{
        getData()
    })

    const getData=async()=>{
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

  return (
    <Container>
      <h1>This is profile</h1>
    </Container>
  )
}

export default Profile