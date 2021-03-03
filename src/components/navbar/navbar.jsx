import React, {useState, useEffect} from 'react';
import './navbar.sass';


const MenuComponent = props => {
  useEffect(()=>{
    if (props.active){
      props.collapse(props.open);
    }
  });
  return <span className="menu__component">{props.text + ' '}</span>
}

const MenuProp = props => {
  useEffect(()=>{
    if (props.active){
      props.collapse(props.open);
    }
  });
  return <span className="menu__prop">{props.text + ' = ' + ' '.repeat(props.extraSpace)}</span>
}

const MenuValue = props => {
  useEffect(()=>{
    if (props.active){
      props.collapse(props.open);
    }
  });
  return <span className="menu__value">{`'${props.text}'\n\n`}</span>
}

const MenuLink = props => {
  useEffect(()=>{
    if (props.active){
      props.collapse(props.open);
    }
  });
  return <a href={props.src} className="menu__link" onClick={props.toggler}>{`{${props.text}}\n\n`}</a>
}

const Menu = props => {
  let [current, setCurrent] = useState(0);
  let menu = document.querySelector('.menu');
  async function collapse(open){
      if (open){
        await new Promise(resolve => setTimeout(resolve, 50));
        menu.childNodes[current-1].style.display = 'none';
      }else{
        await new Promise(resolve => setTimeout(resolve, 50));
        menu.childNodes[current-1].style.display = 'inline';
      }
    if (current === 11 && !open || current === 1 && open){
      if (open) { 
        await new Promise(resolve => setTimeout(resolve, 700));
        document.body.style.overflow = '';
      }
      props.setAlter(false);
      setCurrent(0);
      props.setOpen(!open);
    }else{
      setCurrent(open ? current - 1 : current + 1);
    }
  }
  useEffect(()=>{
    if (props.alter&&(current===0)){
      setCurrent(props.open ? 11 : 1)
    }
  })
  return <div className="menu">
    <MenuComponent key={1} text='MikhailKozlov' active = {(current === 1)&&props.alter ? true : false} open = {props.open} collapse={collapse}/>
    <MenuProp key={2} text='theme' active = {(current === 2)&&props.alter ? true : false} open = {props.open} collapse={collapse}/>
    <MenuValue key={3} text='dark' active = {(current === 3)&&props.alter ? true : false} open = {props.open} collapse={collapse}/>
    <MenuProp key={4} text='preview' extraSpace={2} active = {(current === 4)&&props.alter ? true : false} open = {props.open} collapse={collapse}/>
    <MenuLink toggler={props.toggler} key={5} src='#' text='На главную' active = {(current === 5)&&props.alter ? true : false} open = {props.open} collapse={collapse}/>
    <MenuProp key={6} text='skills' extraSpace={7} active = {(current === 6)&&props.alter ? true : false} open = {props.open} collapse={collapse}/>
    <MenuLink toggler={props.toggler} key={7} src='#skills' text='Навыки' active = {(current === 7)&&props.alter ? true : false}  open = {props.open} collapse={collapse}/>
    <MenuProp key={8} text='projects' extraSpace={5} active = {(current === 8)&&props.alter ? true : false} open = {props.open} collapse={collapse}/>
    <MenuLink toggler={props.toggler} key={9} src='#projects' text='Портфолио' active = {(current === 9)&&props.alter ? true : false}  open = {props.open} collapse={collapse}/>
    <MenuProp key={10} text='contacts' extraSpace={3} active = {(current === 10)&&props.alter ? true : false} open = {props.open} collapse={collapse}/>
    <MenuLink toggler={props.toggler} key={11} src='#contacts' text='Контакты' active = {(current === 11)&&props.alter ? true : false} open = {props.open} collapse={collapse}/>
  </div>
}

const Navbar = props => {
  let [open, setOpen] = useState(false);
  let [alter, setAlter] = useState(false);

  function toggler(event){
    if (alter) return
    setAlter(true);
    if (!open) document.body.style.overflow = 'hidden';
    let ham = document.querySelector('.navbar__hamburger');
    ham.classList.toggle('navbar__hamburger_active');
    let navbar = document.querySelector('.navbar');
    navbar.classList.toggle('navbar_active');
    let menu = document.querySelector('.menu');
    menu.classList.toggle('menu_active');
  }

  return <header className="navbar">
    <div className="container">
      <div className="navbar-wrap">
        <Menu open = {open} setOpen = {setOpen} alter = {alter} setAlter = {setAlter} toggler = {toggler}/>
        <button className="navbar__hamburger" onClick={toggler}><span/><span/><span/></button>
      </div>
    </div>
  </header>
};

export default Navbar;