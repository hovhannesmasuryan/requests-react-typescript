import './App.css';
import { useState } from "react";
import UnsplashAllPhotos from './Components/UnsplashAllPhotos/UnsplashAllPhotos';
import {Route, Routes  } from "react-router-dom";
import UniqUnsplashPhotoDetails from './Components/UniqUnsplashPhotoDetails/UniqUnsplashPhotoDetails';
import PageErrors from './Components/PageErrors/PageErrors';


function App(): JSX.Element {

  

  return (
    <div className="App">
      
      <Routes>
        <Route path='/' >
          <Route index element={<UnsplashAllPhotos />}/>
          <Route path=':id'element={<UniqUnsplashPhotoDetails  /> }/>
        </Route>
        <Route path='*' element={<PageErrors/>}/>
       
       </Routes>
       
    </div>
  );
}

export default App;
