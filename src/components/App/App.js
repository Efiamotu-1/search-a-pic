import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './styles.scss';

import Header from '../Header';
import SearchBar from '../SearchBar';
import Results from '../Results';
import Footer from '../Footer';

import { searchFormat } from '../../utils/searchFormat';

const PIXABAY_URL = process.env.REACT_APP_PIXABAY_URL

const App = () => {
  // Our local state
  // The user's search
  const [search, setSearch] = useState("pink");
  // Our array of images, send by the API
  const [images, setImages] = useState([]);

  // Function who calls the API of Pixabay

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await Axios({
          method: 'GET',
          url: `${PIXABAY_URL}&q=${search ? searchFormat(search) : '%27%27'}`
        });
        if (response.status !== 200) return console.error('ERROR');
        setImages(response.data.hits);
        console.log("La réponse API :", response);
      } catch (error) {
        console.log(error);
      }
    }
    loadImages();
  }, [search]);

  return (
    <div className="App">
      <Header />
        <SearchBar setSearch={setSearch} />
        <Results images={images} />
        <Footer />
    </div>
  );
}

export default App;
