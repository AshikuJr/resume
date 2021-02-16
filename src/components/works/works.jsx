import React, {useState, useEffect} from 'react';
import './works.sass';

import gift from './gift.jpg';
import sqwd from './sqwd.jpg';
import vpn from './vpn.jpg';
import black from './black.jpg';

import giftIcon from './gift-icon.png';
import sqwdIcon from './sqwd-icon.png';
import vpnIcon from './vpn-icon.png';

const portfolio = [
  {
    title: "SQWD",
    description: "Сайт-визитка креативного агенства",
    bg: sqwd,
    link: 'https://ashikujr.github.io/SQWD/dist/index.html'
  },
  {
    title: "Gift",
    description: "Лендинг сервиса по подбору подарков",
    bg: gift,
    link: 'https://ashikujr.github.io/gift/dist/index.html'
  },
  {
    title: "VPN",
    description: "Сайт SaaS-проекта Lasles VPN",
    bg: vpn,
    link: 'https://ashikujr.github.io/VPN/dist/index.html'
  }
];

const Work = props => {
  return <div className="work" onClick = {props.onClick}>
    <img src={props.icon} alt="" className="work__icon"/>
  </div>
};

const Works = props => {
  async function preload(array){
    const promises = array.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      });
    });
    await Promise.all(promises);
    setLoaded(true);
  };
  let [current, setCurrent] = useState(0);
  let [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const images = portfolio.map(work => work.bg);
    preload(images);
  }, []);
  return <section className="works" id='works' style = {{backgroundImage: (current == 0) ? `url(${black})` : `url(${portfolio[current - 1].bg})`}}>
    <Work icon = {sqwdIcon} onClick = {() => setCurrent(1)}/>
    <Work icon = {giftIcon} onClick = {() => setCurrent(2)}/>
    <Work icon = {vpnIcon} onClick = {() => setCurrent(3)}/>
    {(loaded === true)&&<div className='works-central' onClick = {() => setCurrent(0)}>
      <h2 className="works-central__title">{(current == 0) ? 'примеры\nработ' : portfolio[current - 1].title}</h2>
      {(current != 0)&&<p className="works-central__description">{portfolio[current - 1].description}</p>} 
      {(current != 0)&&<a href={portfolio[current - 1].link} className="works-central__seemore" target='_blank' onClick = {(event) => event.stopPropagation()}>Открыть</a>}
    </div>}
  </section>
};

export default Works;