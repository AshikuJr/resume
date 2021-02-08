import React, {useEffect} from 'react';
import './hero.sass';

const Hero = props => { 
  function tiltBG(){
    let hero = document.querySelector('.hero');
    hero.style.backgroundPosition = `center ${window.pageYOffset}px`;
  }
  useEffect(()=>{
    window.addEventListener('scroll', tiltBG);
    return () => {
      window.removeEventListener('scroll', tiltBG);
    }
  });
  return <section className="hero">
    <h1 className="hero__title">некит дебик</h1>
  </section>
};

export default Hero;