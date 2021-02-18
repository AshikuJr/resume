import React, {useState, useEffect} from 'react';
import './contacts.sass';

import email from './email.png';
import discord from './discord.png';
import github from './github.png';

const FormInput = props => {
  let [value, setValue] = useState('');
  function handleChange(event){
    setValue(event.target.value);
  };
  function setFocus(event){
    event.target.nextSibling.focus();
  };
  function moveLabel(event){
    (value == '')&&event.target.previousSibling.classList.toggle('form__label_active');
  };
  return <div className="form-short" style={{gridArea: props.name}}>
    <label htmlFor = {props.name} className = 'form__label' onClick={setFocus}>{props.label}</label>
    <input type={props.type} name = {props.name} className="form__input" value={value} onChange = {handleChange} onFocus = {moveLabel} onBlur= {moveLabel}/>
  </div>
};

const FormArea = props => {
  let [value, setValue] = useState('');
  function handleChange(event){
    setValue(event.target.value);
  };
  function setFocus(event){
    event.target.nextSibling.focus();
  };
  function moveLabel(event){
    (value == '')&&event.target.previousSibling.classList.toggle('form__label_active');
  };
  return <div className="form-area" style={{gridArea: props.name}}>
    <label htmlFor = {props.name} className = 'form__label' onClick={setFocus}>{props.label}</label>
    <textarea type="text" name = {props.name} className="form__textarea" value={value} onChange = {handleChange} onFocus = {moveLabel} onBlur= {moveLabel}/>
  </div>
};

const Account = props => {
  return <div className="account">
    <img src={props.icon} alt="" className="account__icon"/>
    <span className="account__info">{props.info}</span>
  </div>
};

const Contacts = props => {
  return <footer className="contacts" id='contacts'>
    <div className="container">
      <div className="contacts-wrap">
        <div className="contacts-rest">
          <h2 className="contacts__title">контакты</h2>
          <Account icon = {email} info = 'AshikuJr@gmail.com'/>
          <Account icon = {discord} info = 'AshikuJr#0299'/>
          <Account icon = {github} info = 'github.com/AshikuJr'/>
        </div>
        <form className='form' action="#" method='post' name='feedback'>
          <h3 className="form__title">Обратная связь</h3>
          <FormInput name='name' type='text' label='Ваше имя'/>
          <FormInput name='theme' type='text' label='Тема сообщения'/>
          <FormArea name='comment' label='Сообщение'/>
          <FormInput name='email' type='email' label='Ваша почта'/>
          <input type="submit" className="form-button"/>
        </form>
      </div>
    </div>
  </footer>
};

export default Contacts;