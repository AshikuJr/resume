import React, {useEffect} from 'react';
import './hero.sass';

const Hero = props => {
  function resize(){
    let hero = document.querySelector('.hero');
    hero.style.backgroundSize = `auto ${document.clientHeight}px`;
  }
  useEffect(()=>{
    resize();
    document.addEventListener('resize', resize);
    return () => {
      document.removeEventListener('resize', resize);
    }
  })
  return <section className="hero">
  </section>
};

export default Hero;