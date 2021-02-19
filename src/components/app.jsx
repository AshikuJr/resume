import React, {useEffect, useState} from 'react';
import '../styles.sass';

import Navbar from './navbar/navbar.jsx';
import Hero from './hero/hero.jsx';
import Skills from './skills/skills.jsx';
import Works from './works/works.jsx';
import Contacts from './contacts/contacts.jsx';

const App = () => {
  return <>
    <Navbar/>
    <Hero/>
    <Skills/>
    <Works/>
    <Contacts/>
  </>
};

export default App;