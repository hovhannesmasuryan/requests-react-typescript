// UniqUnsplashPhotoDetails.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import UniqHeader from '../UniqHeader/UniqHeader';
import UniqPhotosItem from "../UniqPhotosItem/UniqPhotosItem";
import './UniqUnsplashPhotoDetails.css';

function UniqUnsplashPhotoDetails(): JSX.Element {
  const { id } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [messageError, setMessageError] = useState<string>('')
  const fetchData = async (id: string) => {
    const apiKey = "XWdQZDOrDWHnLx7uM4-7iquo34l1mBVQ_oiGI9cbuE8";

    try {
      const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
        headers: {
          'Authorization': `Client-ID ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      setSelectedPhoto(response.data);
    } catch (error: any) {
       setMessageError(error.messsgae)
    }
  }

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id])

  return (
    <div className="Uniqbackground">
      <UniqHeader/>     
      <UniqPhotosItem selectedPhoto={selectedPhoto} />
    </div>
  )
}

export default UniqUnsplashPhotoDetails;
