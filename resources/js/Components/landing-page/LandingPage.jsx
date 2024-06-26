import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios'; // Import Axios
import Stack from './Stack/Stack.jsx'
import Header from './Header/Header.jsx';
import About from './About/About.jsx';
import Portfolio from './Portfolio/Portfolio.jsx';
import Contact from './Contact/Contact.jsx';
import Footer from './Footer/Footer.jsx';
import ThemeContext from './ThemeContext.jsx';
import './Landing.css'
import Plx from 'react-plx';

function LandingPage() {
  const [sections, setSections] = useState({});
  const [who, setWho] = useState({});
  const [stack,setStack]=useState({})
  const [Aboutsec,setAbout]=useState({})
  const [Portfoliosec,setPortfolio]=useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://mohammadzenalabdeen.site/api/sections');
        setSections(response.data);
        
        // Filtering element with title 'Who am I?'
        setWho( response.data.find((element) => element.title === 'Who am I?'));
        setStack(response.data.find((element)=>element.title === 'stack'));
        setAbout(response.data.find((element)=>element.title === 'About me'));
        setPortfolio(response.data.find((element)=>element.title === 'Portfolio'));

        console.log(Aboutsec); // Note: Use whoElement instead of who
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call fetchData function

  }, []); // Add empty dependencies array to run effect only once
  const [theme,setTheme]=useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
  const toggleTheme = ()=>{ setTheme(theme==='light' ? 'dark' : 'light')};
  useEffect(()=>{localStorage.setItem('theme',theme);
document.body.className=theme;
},[theme]);


  return (
    <>{who.title !== undefined ? (
    <ThemeContext.Provider value={{theme,toggleTheme}}>

      <Header who={who}></Header>


      <main className={theme}>
        <Stack stack={stack}></Stack>
        <About About={Aboutsec}></About>

        <Portfolio Portfolio={Portfoliosec}></Portfolio>
        <Contact></Contact>
      </main>
      <Footer></Footer>
      </ThemeContext.Provider>        
      ) : (
        <p>Loading...</p> // Show loading message while data is being fetched
      )}
    </>
  );
}

export default LandingPage;''