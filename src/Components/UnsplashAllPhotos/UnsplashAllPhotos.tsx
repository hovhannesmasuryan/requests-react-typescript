import React, { useEffect, useState, useCallback } from 'react';
import axios, {} from 'axios';
import { useNavigate } from 'react-router-dom';
import './UnsplashAllPhotos.css';
import Loading from '../Loading/Loading';
import Header from '../Header/Header';
import PageErrors from '../PageErrors/PageErrors';
import PhotosItem from '../PhotosItem/PhotosItem';

interface Data {
  id: string;
  user: {
    name: string;
    profile_image: {
      medium: string;
    };
  };
  urls: {
    small: string;
  };
  created_at: string;
  alt_description: string;
  likes: number;
}
function UnsplashAllPhotos(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isScroll, setIsScroll] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [messageError, setMessageError] = useState<string>('');
  const navigate = useNavigate();

  const fetchData = useCallback(async (page: number) => {
    const apiUrl = `https://api.unsplash.com/photos?page=${page}`;
    const apiKey = "XWdQZDOrDWHnLx7uM4-7iquo34l1mBVQ_oiGI9cbuE8";

    if(isScroll && currentPage + 1 >= count){
      
    try {
      const response = await axios.get<Data[]>(apiUrl, {
        params: {
          _limit: 10,
          _page: page
        },
        headers: {
          'Authorization': `Client-ID ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
      setIsScroll(false);
      setCurrentPage(page + 1);
    } catch (error: any) {
      if (error.response?.status === 404) {
        navigate('/PageErrors');
      } else {
        setMessageError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  }, [isScroll]);

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = (e: any) => {
    if ((e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - window.innerHeight) <  currentPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      setIsScroll(true);
    }
  };

  return (
    <div className='Haed'>
     <Header/>
      <div className='Container'>
        {
          loading ? <Loading />
            : messageError ?
               <PageErrors />
              :
              photos.map((photo: Data) => (
                <PhotosItem key={photo.id} photo={photo} navigate={navigate} />
              ))
        }
      </div>
    </div>
  );
}

export default UnsplashAllPhotos;
