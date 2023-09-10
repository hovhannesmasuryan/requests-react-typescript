import  React,{ useEffect, useState } from 'react';
import axios from 'axios';
import './UnsplashAllPhotos.css'
import { useNavigate } from "react-router";
function UnsplashAllPhotos(): JSX.Element {
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const navigate = useNavigate()

  const fetchData = async (page: number) => {
    const apiKey = "XWdQZDOrDWHnLx7uM4-7iquo34l1mBVQ_oiGI9cbuE8";
    const apiUrl = `https://api.unsplash.com/photos?page=${page}&per_page=10`;
  
   await axios
      .get(apiUrl, {
        headers: {
          'Authorization': `Client-ID ${apiKey}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setPhotos(response.data);
        setLastPage(response.headers['x-total-pages']);
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });
  };
  useEffect(() => {

    if (!lastPage || currentPage <= lastPage) {
      fetchData(currentPage);
    }
  }, [currentPage, lastPage]);

  const handleNextPage = () => {
    if (lastPage === null || currentPage < lastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };


  

  console.log(photos)
  return (
    <div>
      <div className='Header'>
      <h1>All Unsplash Photos</h1>
      <button onClick={handleNextPage} disabled={currentPage === lastPage}>
        Next Page
      </button>
      </div>
      
      <div className='Container'>
        {photos.map((photo: any) => (
          <div className='AllInfo' key={photo.id}  >
            <h2 className='First-name'>{photo?.user.name}</h2>
            <div>
            <img src={photo?.urls?.small} alt='' />
            <p> Uploded:  {photo?.created_at}</p>
            <p className='Description'>Description:  {photo?.alt_description} </p>
            <p className='Likes'> Like:  {photo?.likes}</p>
            <button className='ShowMore' onClick={() => navigate(photo.id.toString())}>Show More</button>
          </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default UnsplashAllPhotos;
