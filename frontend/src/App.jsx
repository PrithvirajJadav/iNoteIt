import React from 'react'

import UserState from './contexts/users/userState';
import NoteState from './contexts/notes/noteState';
import ToastState from './contexts/toasts/toastState';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar'
import Home from './components/Home'
import Contact from './components/Contact'
import About from './components/About'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import NoteTypes from './components/NoteTypes';
import Notes from './components/Notes';

const App = () => {
  return (
    <>
    <ToastState>
      <UserState>
        <NoteState>

          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/notetypes' element={<NoteTypes />} />
            <Route path="/notes" element={ <Notes /> } />
          </Routes>

        </NoteState>
      </UserState>
    </ToastState>
      
    </>
  )
}

export default App;

