import React, {useState, useEffect} from 'react';
import './skills.sass';

import css from './css-icon.png';
import react from './react-icon.png';
import webpack from './webpack-icon.svg';
import git from './git-icon.png';
import me from './me-icon.png';

const titles = [
    'стили',
    'код',
    'сборка',
    'версии',
    'soft skills'
  ];
const descriptions = [
    ['Умею делать отзывчивую и адаптивную верстку',
'Знаком со стандартами CSS Grid и Flexbox модулей',
'Переходы и анимацию реализую на чистом CSS везде, где это возможно',
'Пользуюсь стилевым препроцессором SASS',
'Делаю красиво'],
    ['Постигаю дзен компонентной верстки с React',
'Практикуюсь в ванильном JS, не прибегая к помощи сторонних библиотек типа JQuery',
'Планирую эволюционировать из верстальщика в полноценного frontend-, а затем и fullstack-разработчика',
'Когда-нибудь я дочитаю учебник Ильи Кантора (но не сегодня)',
'Этот сайт (и все работы из секции ниже) сделаны на React'],
    ['create-react-app меня не устроил – я хочу понимать, что происходит под капотом',
'Так что я поломал голову, погуглил и настроил Webpack под себя',
"В моем конфиге (точнее, в двух) – полифил, минификаторы, source map'ы, аутопрефиксер, пачка других плагинов",
'Как-то спокойнее работать, когда понимаешь, что значит каждая строчка в коде проекта'],
    ['Исходники моих работ можно найти на GitHub',
'Все они сделаны в одну "ветку", но я знаю Git Flow и готов работать в команде',
'В планах разобраться с CI/CD, в частности, с деплоем непосредственно на GitHub'],
    ['Я учился на мехмате НГУ',
'Как следствие – неплохо владею математическим аппаратом и умею мыслить абстрактно',
'Понимаю как технический, так и человеческий русский',
'Быстро усваиваю информацию (до текущего уровня я самообучился с нуля за три месяца)',
'Умею внимательно слушать и задавать правильные вопросы (в частности... да, гуглить!)',
'Я хороший, добрый и красивый']
  ];

const SkillBlock = props => {
  return <div className={`skill-block${props.active ? ' skill-block_active' : ''}`}>
    <button className="skill-block__button" onClick = {props.click}>
      <img src={props.icon} alt='' className="skill-block__icon"/>
    </button>
  </div>
};

const Skills = props => {
  let [current, setCurrent] = useState(0);
  let [phrase, setPhrase] = useState(1);
  let [alter, setAlter] = useState(false);

  let initX = 0;

  async function fade(node){
    node.style.opacity = '0';
    await new Promise(resolve => setTimeout(resolve, 600));
    node.style.opacity = '1';
  }
  async function skillblockClickHandler(number){
    if (alter) return
    if (number == current) {
      setCurrent(0);
      return
    }
    if (current == 0){
      setCurrent(number);
      setPhrase(1);
      return
    }
    setAlter(true);
    fade(document.querySelector('.skills__description'));
    fade(document.querySelector('.skills__subtitle'));
    fade(document.querySelector('.skills__indicators'));
    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrent(number);
    setPhrase(1);
    await new Promise(resolve => setTimeout(resolve, 500));
    setAlter(false);
  }

  async function phraseIncrement(){
    if (alter) return
    setAlter(true);
    fade(document.querySelector('.skills__description'));
    await new Promise(resolve => setTimeout(resolve, 500));
    setPhrase((phrase) % descriptions[current-1].length + 1);
    setAlter(false);
  }

  async function phraseDecrement(){
    if (alter) return
    setAlter(true);
    fade(document.querySelector('.skills__description'));
    await new Promise(resolve => setTimeout(resolve, 500));
    setPhrase((phrase == 1) ? descriptions[current - 1].length : (phrase - 1));
    setAlter(false);
  }


  return <section className="skills" id='skills'>
    <h2 className="skills__title">мои навыки</h2>
    <span className="skills__subtitle">{(current!=0)&&titles[current-1]}</span>
    {(current!=0)&&<div className="skills__description"
    onPointerDown = {event => {
      initX = event.clientX;
      console.log('down ' + event.clientX);
    }}
    onPointerUp = {event => {
      if (event.clientX - initX < -100){
        phraseDecrement();
      }else{
        phraseIncrement();
      }
      initX = 0;
      console.log('up ' + event.clientX);
    }}
    draggable='false'>{descriptions[current - 1][phrase - 1]}</div>}
    {(current!=0)&&<div className="skills__indicators">
      <span className={"skills__indicator" + ((phrase == 1) ? ' skills__indicator_active' : ((descriptions[current - 1].length >= 1) ? '' : ' skills__indicator_inactive'))}></span>
      <span className={"skills__indicator" + ((phrase == 2) ? ' skills__indicator_active' : ((descriptions[current - 1].length >= 2) ? '' : ' skills__indicator_inactive'))}></span>
      <span className={"skills__indicator" + ((phrase == 3) ? ' skills__indicator_active' : ((descriptions[current - 1].length >= 3) ? '' : ' skills__indicator_inactive'))}></span>
      <span className={"skills__indicator" + ((phrase == 4) ? ' skills__indicator_active' : ((descriptions[current - 1].length >= 4) ? '' : ' skills__indicator_inactive'))}></span>
      <span className={"skills__indicator" + ((phrase == 5) ? ' skills__indicator_active' : ((descriptions[current - 1].length >= 5) ? '' : ' skills__indicator_inactive'))}></span>
      <span className={"skills__indicator" + ((phrase == 6) ? ' skills__indicator_active' : ((descriptions[current - 1].length >= 6) ? '' : ' skills__indicator_inactive'))}></span>
    </div>}
    <div className="skills-wrap">
      <SkillBlock active = {current === 1}
      icon = {css}
      click = {() => skillblockClickHandler(1)}/>
      <SkillBlock active = {current === 2}
      icon = {react}
      click = {() => skillblockClickHandler(2)}/>
      <SkillBlock active = {current === 3}
      icon = {webpack}
      click = {() => skillblockClickHandler(3)}/>
      <SkillBlock active = {current === 4}
      icon = {git}
      click = {() => skillblockClickHandler(4)}/>
      <SkillBlock active = {current === 5}
      icon = {me}
      click = {() => skillblockClickHandler(5)}/>
    </div>
  </section>
};

export default Skills;