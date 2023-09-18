import React, { useEffect, useState, useCallback } from 'react';
import axios, {} from 'axios';
import { useNavigate } from 'react-router-dom';
import './UnsplashAllPhotos.css';
import Loading from '../Loading/Loading';
interface Data {
  id: string;
  user: {
    name: string;
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
    <div>
      <div className='Header'>
        <h1>All Unsplash Photos</h1>
      </div>
      <div className='Container'>
        {
          loading ? <Loading />
            : messageError ?
              <h1 style={{ color: 'white' }}>{messageError}</h1>
              :
              photos.map((photo: any) => (
                <div className='AllInfo' key={photo.id}>
                   <div className='profil-name-img '>                
                      <img className='user-profile-img' src={photo.user.profile_image.medium}/>
                      <h2 className='First-name'>{photo?.user.name}</h2>         
                    </div>         

                  <div>
                    <div>
                      <img src={photo?.urls?.small} alt=''  className='posted-img'/>
                    </div>
                    <div className='desc'>
                      <p>Uploaded: {photo?.created_at}</p>
                      <p className='Description'>Description: {photo?.alt_description}</p>
                      <p className='Likes'>Like: {photo?.likes}</p>
                      <button className='ShowMore' onClick={() => navigate(photo.id.toString())}>Show More</button>
                    </div>
                  </div>
                </div>
              ))
        }
      </div>
    </div>
  );
}

export default UnsplashAllPhotos;
