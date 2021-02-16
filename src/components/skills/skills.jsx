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
    ['Исходники моих работ можно найти на GitHub (ссылка будет ниже)',
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

const Description = props => {
  let [phrase, setPhrase] = useState(0);
  let length = descriptions[props.current - 1].length;
  useEffect(()=>{
    let timer;
    if (document.hasFocus()){
      timer = setTimeout(() => {
        if (phrase === length - 1){
          props.setCurrent(0);
        }else{
          setPhrase(phrase + 1);
        }
      }, 4000);
    }
    return () => {
      clearTimeout(timer);
    }
  });
  return <p className="skills__description">{descriptions[props.current - 1][phrase]}</p>
};

const Skills = props => {
  let [current, setCurrent] = useState(0);
  function hideOnBlur(){
    setCurrent(0);
  }
  useEffect(()=>{
    window.addEventListener('blur', hideOnBlur);
    return () => {
      window.removeEventListener('blur', hideOnBlur);
    }
  });
  return <section className="skills" id='skills'>
    <h2 className="skills__title">мои навыки</h2>
    <span className="skills__subtitle">{(current!=0)&&titles[current-1]}</span>
    {(current==1)&&<Description current = {1} setCurrent = {setCurrent}/>}
    {(current==2)&&<Description current = {2} setCurrent = {setCurrent}/>}
    {(current==3)&&<Description current = {3} setCurrent = {setCurrent}/>}
    {(current==4)&&<Description current = {4} setCurrent = {setCurrent}/>}
    {(current==5)&&<Description current = {5} setCurrent = {setCurrent}/>}
    <div className="skills-wrap">
      <SkillBlock active = {current === 1}
      icon = {css}
      click = {() => {
        (current != 1) ? setCurrent(1) : setCurrent(0);
      }}/>
      <SkillBlock active = {current === 2}
      icon = {react}
      click = {() => {
        (current != 2) ? setCurrent(2) : setCurrent(0);
      }}/>
      <SkillBlock active = {current === 3}
      icon = {webpack}
      click = {() => {
        (current != 3) ? setCurrent(3) : setCurrent(0);
      }}/>
      <SkillBlock active = {current === 4}
      icon = {git}
      click = {() => {
        (current != 4) ? setCurrent(4) : setCurrent(0);
      }}/>
      <SkillBlock active = {current === 5}
      icon = {me}
      click = {() => {
        (current != 5) ? setCurrent(5) : setCurrent(0);
      }}/>
    </div>
  </section>
};

export default Skills;