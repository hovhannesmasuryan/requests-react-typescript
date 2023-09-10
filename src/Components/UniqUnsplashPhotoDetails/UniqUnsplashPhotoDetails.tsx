import axios from "axios";
import React,{ useEffect, useState } from "react";
import { useNavigate, useParams, } from 'react-router-dom'
import './UniqUnsplashPhotoDetails.css'

const UniqUnsplashPhotoDetails = (): JSX.Element => {
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
          // setPhotos((prevPhotos: any) => [...prevPhotos, ...response.data]);
          setSelectedPhoto(response.data);
        })
     }
    useEffect(() => {
      if (id) {
        
        fetchData(id)
      }
        },[id])
    
  return (
    <div>
        
           <div className="UniqUnsplashPhotoDetails">
            <div>
                 <button onClick={() => navigation('/')}>Back</button>
                 <h1>More Details</h1>
                 <img src={selectedPhoto?.urls?.regular} alt=""/>
                 <h4>{selectedPhoto?.user?.location}</h4>
                 <p>{selectedPhoto?.created_at}</p>
            </div>
             <div className="UniqUnsplashPhotoTxt">
                  <h2 className='First-name'> Name:  {selectedPhoto?.user.name}</h2>
                  <p>{selectedPhoto?.user?.bio}</p>
                  <p className='Description'> Description:  {selectedPhoto?.alt_description}</p>
                  <span className='Likes'> Like: {selectedPhoto?.likes}</span>
                  
                  
             </div>
           </div>
        
    </div>
  )
}

export default UniqUnsplashPhotoDetails