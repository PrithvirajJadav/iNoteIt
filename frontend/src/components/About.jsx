import './css/about.css'
import React, { useEffect } from 'react'

const About = () => {
  useEffect(()=>{
    document.title='iNoteIt - About Us';
  },[])
  return (
    <div style={{ position: 'relative' }}>
      <div className='about-image-container'>

      </div>
      <div className='about-container'>
        <div className='about-div'>
        <h1>About iNoteIt</h1>
        <h2>At iNoteIt, we believe in the power of ideas. Whether you're a student, professional, creative thinker, or someone who simply loves to jot down thoughts, iNoteIt is your perfect companion for capturing and organizing your notes digitally.</h2>
        </div>
        <div className="about-div">
          <h1>Our Mission</h1>
          <h2>Our mission is to provide a seamless, intuitive, and secure platform where you can easily create, manage, and share your notes. We aim to enhance your productivity and creativity by offering features that simplify note-taking and ensure your ideas are always at your fingertips.</h2>
        </div>
        <div className="about-div">
          <h1>Our Story</h1>
          <h2>iNoteIt was founded by a team of passionate individuals who understand the importance of capturing fleeting thoughts and brilliant ideas. Frustrated by the limitations of traditional note-taking methods, we set out to create a platform that combines the convenience of digital notes with powerful organizational and collaborative features. Today, iNoteIt helps thousands of users around the world bring their ideas to life.</h2>
        </div>
      </div>

    </div>
  )
}

export default About
