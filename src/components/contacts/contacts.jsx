import React, {useState, useEffect} from 'react';
import './contacts.sass';

import email from './email.png';
import discord from './discord.png';
import github from './github.png';

const mailRegExp = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;

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
    <input type={props.type} name = {props.name} className="form__input" value={value} onChange = {handleChange} onFocus = {moveLabel} onBlur = {(event) => {
      moveLabel(event);
      let valid = (props.name == 'email') ? mailRegExp.test(value) : value != '';
      valid
      ? event.target.classList.contains('form_invalid')&&event.target.classList.remove('form_invalid') 
      : !event.target.classList.contains('form_invalid')&&event.target.classList.add('form_invalid');
    }}/>
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
    <textarea type="text" name = {props.name} className="form__textarea" value={value} onChange = {handleChange} onFocus = {moveLabel} onBlur = {(event) => {
      moveLabel(event);
      value != ''
      ? event.target.classList.contains('form_invalid')&&event.target.classList.remove('form_invalid') 
      : !event.target.classList.contains('form_invalid')&&event.target.classList.add('form_invalid');
    }}/>
  </div>
};


const Account = props => {
  return <div className="account">
    <img src={props.icon} alt="" className="account__icon"/>
    <span className="account__info">{props.info}</span>
  </div>
};

const Contacts = props => {
  function validate(event){
    event.preventDefault();
    const form = document.forms.feedback;
    let isOK = true;
    if (form.name.value == ''){
      isOK = false;
      (!form.name.classList.contains('form_invalid'))&&form.name.classList.add('form_invalid');
    }else{
      form.name.classList.contains('form_invalid')&&form.name.classList.remove('form_invalid');
    };
    if (form.theme.value == ''){
      isOK = false;
      (!form.theme.classList.contains('form_invalid'))&&form.theme.classList.add('form_invalid');
    }else{
      form.theme.classList.contains('form_invalid')&&form.theme.classList.remove('form_invalid');
    };
    if (form.comment.value == ''){
      isOK = false;
      (!form.comment.classList.contains('form_invalid'))&&form.comment.classList.add('form_invalid');
    }else{
      form.comment.classList.contains('form_invalid')&&form.comment.classList.remove('form_invalid');
    };
    if (!mailRegExp.test(form.email.value)){
      isOK = false;
      (!form.email.classList.contains('form_invalid'))&&form.email.classList.add('form_invalid');
    }else{
      form.email.classList.contains('form_invalid')&&form.email.classList.remove('form_invalid');
    };
    isOK&&form.submit();
  };

  return <footer className="contacts" id='contacts'>
    <div className="container">
      <div className="contacts-wrap">
        <div className="contacts-rest">
          <h2 className="contacts__title">контакты</h2>
          <Account icon = {email} info = 'AshikuJr@gmail.com'/>
          <Account icon = {discord} info = 'AshikuJr#0299'/>
          <Account icon = {github} info = 'github.com/AshikuJr'/>
        </div>
        <form noValidate autoComplete = 'off' className='form' action="#" method='post' name='feedback' onSubmit = {validate}>
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