import React, { useContext, useState } from 'react';
import { GoArrowUpRight } from "react-icons/go";
import { MdMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import parse from 'html-react-parser';
import './Header.css'
import './../Landing.css'
import ThemeContext from '../ThemeContext';
import { FaRegMoon } from "react-icons/fa";
import { GrSun } from "react-icons/gr";



function Header({ who }) {
    let p = './../../../../images/';

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    let Theme=useContext(ThemeContext);

    return (
        <>
        <nav>
        <h1>MZ</h1>
        <button onClick={toggleMenu} id='menu'>
            {isOpen ? <RxCross2 size={30} color={Theme.theme==='light' ? 'black':'white'}/> : <MdMenu size={30} color={Theme.theme==='light' ? 'black':'white'}/>}
        </button>
        <ul className={`side ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleMenu} id='close'>
                <RxCross2 size={30} />
            </button>
            <Link
      to="Hero" 
      spy={true} 
      smooth={true} 
      offset={-350} 
      duration={500} 

    > <li>
      Home
      </li>
    </Link> 
 
    <Link
      to="About" 
      spy={true} 
      smooth={true} 
      offset={-190} 
      duration={500} 

    >   <li>
      About Me
      </li>
    </Link> 

    <Link
      to="Portfolio" 
      spy={true} 
      smooth={true} 
      offset={-100} 
      duration={500} 

    >    <li>
     Portfolio
     </li>
    </Link> 
 
    <Link
      to="Contact" 
      spy={true} 
      smooth={true} 
      offset={50} 
      duration={500} 

    >   <li>
      Contact
      </li>
    </Link> 
    
            <button className='Theme' onClick={()=>{Theme.toggleTheme()}}>{Theme.theme==='light' ? <div><FaRegMoon size={30}/> <span>Dark Theme</span></div> : <div><GrSun size={30}/> <span>Light Theme</span></div>}</button>

     

        </ul>
        <ul>
       
    <Link
      to="Hero" 
      spy={true} 
      smooth={true} 
      offset={-50} 
      duration={500} 
    > <li>
      Home
      </li>
    </Link> 
 
    <Link
      to="About" 
      spy={true} 
      smooth={true} 
      offset={-350} 
      duration={500} 

    >   <li>
      About Me
      </li>
    </Link> 

    <Link
      to="Portfolio" 
      spy={true} 
      smooth={true} 
      offset={-100} 
      duration={500} 

    >    <li>
     Portfolio
     </li>
    </Link> 
 
    <Link
      to="Contact" 
      spy={true} 
      smooth={true} 
      offset={50} 
      duration={500} 

    >   <li>
      Contact
      </li>
    </Link> 
        </ul>
        <button className='ThemeBig' onClick={()=>{Theme.toggleTheme()}}>{Theme.theme==='light' ? <FaRegMoon size={30}/>:<GrSun color={'white'} size={30}/>}</button>
    </nav>
        <header className={Theme.theme}>

            <div className='Hero' id='Hero'>
                <div className='WhoContainer'>
                    <div>
                        <p id='title'>{who.title}</p>
                        <div className='desc'>{parse(who.desc)}</div>
                        <div className='B'>
                        <Link
                        id='B1'
      to="Contact" 
      spy={true} 
      smooth={true} 
      offset={50} 
      duration={500} 

    >Contact Me</Link> 
                            <a id='B2' href={who.links}>My Github <GoArrowUpRight size={20}/></a>
                        </div>
                    </div>
                    <div className='ImgContain'>
                        <img src={`${p + who.images[0].img}`} alt="hero-image" />
                        <div className='Border'></div>
                    </div>
                </div>
            </div>
        </header>
        </>
    );
}

export default Header;