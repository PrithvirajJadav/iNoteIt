import './css/home.css'

import React, { useContext, useEffect } from 'react'

// Importing icons
import { RiOrganizationChart } from "react-icons/ri";
import { FaBook } from "react-icons/fa6";
import { AiOutlineCloudSync } from "react-icons/ai";
import { TbFileSearch } from "react-icons/tb";

import toastContext from '../contexts/toasts/toastContexts';
import { useNavigate } from 'react-router-dom';
import FeatureCard from './FeatureCard';
import userContext from '../contexts/users/userContexts';

const Home = () => {
  const contextToast = useContext(toastContext);

  useEffect(() => {
    document.title = 'iNoteIt - Home';
  }, [])

  const context = useContext(userContext);
  const navigate = useNavigate();

  const handleBtn = () => {
    if (context.loggedin) {
      navigate('/notetypes');
    }
    else {
      navigate('/signup');
    }
  }

  return (
    <>
      <div className='home-container'>
                <div className='home-header'>
                    <h1>Welcome To iNoteBook</h1>
                    <h2>Unleash Your Creativity and Productivity</h2>
                    <h3>Welcome to your personal digital notebook, the ultimate space where your ideas, notes, and projects come to life. Whether you're a student, professional, or creative enthusiast, our platform is designed to help you organize your thoughts, streamline your workflow, and capture inspiration wherever it strikes.</h3>
                    {
                        context.loggedin ? <h4>Ready to capture your thoughts? Start creating your notes now and let your ideas shine.</h4>
                        :<h4>Sign up now to start your journey with our digital notebook and unlock your full creative and productive potential.
                    </h4>
                    }
                    <button type='button' onClick={handleBtn}>{context.loggedin ? "Note Now" : "Get Started"}</button>

                </div>
                <div className='home-icon'>
                </div>
            </div>
            <div className="feature-container">
                    <h1>iNoteBook Features</h1>
                <div className='card-container'>
                    
                    <FeatureCard title='Effortless Note-Taking' desc='Write down your thoughts, ideas, and reminders with our intuitive and user-friendly interface.' icon={<FaBook />} />
                    
                    <FeatureCard title='Organized Structure' desc='Keep your notes tidy and easy to find with customizable notebooks, sections, and tags.' icon={<RiOrganizationChart />} />
                    
                    <FeatureCard title='Seamless Syncing' desc='Access your notes across all your devices, anytime and anywhere' icon={<AiOutlineCloudSync />} />
                    
                    <FeatureCard title='Powerful Search' desc='Find exactly what you are looking for in seconds with our advanced search functionality.' icon={<TbFileSearch />} />

                </div>
            </div>
            <div className='footer'>
                <p>&copy; 2024 iNoteIt. All Rights are Reserved.</p>
            </div>
    </>
  )
}

export default Home
