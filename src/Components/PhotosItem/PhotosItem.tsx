import React from 'react';
import './PhotosItem.css'
interface PhotoItemProps {
  photo: any; 
  navigate: (id: string) => void;
}


function PhotoItem({ photo, navigate }: PhotoItemProps) {
    return (

      <div className='AllInfo' key={photo.id}>

        <div className='profil-name-img '>
          <img className='user-profile-img' src={photo.user.profile_image.medium} alt='' />
          <h2 className='First-name'>{photo?.user.name}</h2>
        </div>
  
        <div>

          <div>
            <img src={photo?.urls?.small} alt='' className='posted-img' />
          </div>

          <div className='desc'>

            <p>Uploaded: <span>{photo?.created_at}</span> </p>
            <p className='Description'>Description: <span>{photo?.alt_description}</span></p>
            <p className='Likes'>Like: <span> {photo?.likes}</span></p>
            <button className='ShowMore' onClick={() => navigate(photo.id.toString())}>
              Show More
            </button>

          </div>

        </div>
        
      </div>
    );
  }
  
  export default PhotoItem;