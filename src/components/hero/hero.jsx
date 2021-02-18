import React, {useEffect, useState} from 'react';
import './hero.sass';

import bg from './full.jpg';

const Hero = props => {
  let [ready, setReady] = useState(false);
  async function preload(src){
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve();
      img.onerror = reject();
    });
    setReady(true);
  };
  useEffect(()=>{
    preload(bg);
  }, []);
  return <>
  {ready&&<section className="hero">
    <h1 className="hero__title">веб-разработчик</h1>
    <span className="hero__subtitle">резюме</span>
  </section>}
  </>
};

export default Hero;