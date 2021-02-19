import React, {useEffect, useState} from 'react';
import './hero.sass';

import bg from './full.jpg';

const Hero = props => {
  async function preload(src){
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
    document.querySelector('.hero').classList.add('hero_loaded');
  }
  useEffect(() => {
    preload(bg);
  });
  return <>
  <div className="hero-bg"></div>
  <section className="hero">
    <h1 className="hero__title">веб-разработчик</h1>
    <span className="hero__subtitle">резюме</span>
  </section>
  </>
};

export default Hero;