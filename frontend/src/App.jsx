import { Route , RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Layout from './components/Layout';
import EmptyPage from './components/EmptyPage';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='/*' element={<EmptyPage/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <div className='bg-[#E2E8F0] box-border min-h-screen flex flex-col'>
      <RouterProvider router={router} />
      < ToastContainer />
    </div>
  )
}

export default App