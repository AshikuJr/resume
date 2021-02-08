import React from 'react';
import '../styles.sass';

import Navbar from './navbar/navbar.jsx';
import Hero from './hero/hero.jsx';
import Skills from './skills/skills.jsx';

const App = () => {
  return <>
    <Navbar/>
    <Hero/>
    <Skills/>
  </>
};

export default App;