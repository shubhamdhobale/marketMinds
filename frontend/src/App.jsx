import {Routes , Route , BrowserRouter} from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';



const App = () => {
  return (
    <div className=''>
      <BrowserRouter>
      <Header/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App