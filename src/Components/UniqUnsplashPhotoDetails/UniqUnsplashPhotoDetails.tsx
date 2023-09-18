import axios from "axios";
import React,{ useEffect, useState } from "react";
import { useNavigate, useParams, } from 'react-router-dom'
import './UniqUnsplashPhotoDetails.css'

function UniqUnsplashPhotoDetails(): JSX.Element{
  const {id} = useParams()
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);     
  const navigation = useNavigate() 

  const fetchData = async (id: string) => {      
  const apiKey = "XWdQZDOrDWHnLx7uM4-7iquo34l1mBVQ_oiGI9cbuE8";
    
       await  axios.get(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            'Authorization': `Client-ID ${apiKey}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response: any) => {
          setSelectedPhoto(response.data);
        })
     }
    useEffect(() => {
      if (id) {
        
        fetchData(id)
      }
        },[id])
    
  return (
    <div className="Uniqbackground">
        
           <div className="Mdet-Back">
               <h1>More Details</h1>
               <button onClick={() => navigation('/')}>Back to Home</button>
           </div>
                 
           <div className="UniqUnsplashPhotoDetails">
              <div className="img">
                 <img src={selectedPhoto?.urls?.regular} alt=""/>
              </div>

              <div className="UniqUnsplashPhotoTxt">
                  <h2 className='First-name'> Name: <span className="span"> {selectedPhoto?.user.name}</span></h2>
                  <p>Bio: <span  className="span">{selectedPhoto?.user?.bio}</span></p>
                  <h4>Location: <span  className="span">  {selectedPhoto?.user?.location} </span></h4>
                  <p>Uploded: <span  className="span">{selectedPhoto?.created_at}</span> </p>
                  <p className='Description'> Description: <span  className="span">  {selectedPhoto?.alt_description}</span></p>
                  <p className='Likes'> Like:   <span className="span">{selectedPhoto?.likes}</span></p>                
             </div>
           </div>
        
    </div>
  )
}

export default UniqUnsplashPhotoDetails