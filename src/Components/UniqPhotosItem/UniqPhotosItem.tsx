import React from 'react';
import BackButton from '../BackButton/BackButton';
import './UniqPhotosItem.css'
interface PhotoDetailsProps {
  selectedPhoto: any; 
}

function UniqPhotosItem({ selectedPhoto }: PhotoDetailsProps) {
  return (
    <div className="UniqUnsplashPhotoDetails">
      <div className="img">

        <div className='profil-name-img'>
          <img className='Uniquser-profile-img' src={selectedPhoto?.user.profile_image.medium} alt='' />
          <h2 className='First-name'> Name: <span className="span"> {selectedPhoto?.user.name}</span></h2>
        </div>
        <img className='posted-img' src={selectedPhoto?.urls?.regular} alt="" />

      </div>

      <div className="UniqUnsplashPhotoTxt">
        <BackButton/>
        <p>Bio: <span className="span">{selectedPhoto?.user?.bio}</span></p>
        <h4>Location: <span className="span">  {selectedPhoto?.user?.location} </span></h4>
        <p>Uploded: <span className="span">{selectedPhoto?.created_at}</span> </p>
        <p className='Description'> Description: <span className="span">  {selectedPhoto?.alt_description}</span></p>
        <p className='Likes'> Like:   <span className="span">{selectedPhoto?.likes}</span></p>
      </div>
    </div>
  );
}

export default UniqPhotosItem;
