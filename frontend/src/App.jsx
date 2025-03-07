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
import Feature from './pages/Feature.jsx';
import Pricing from './pages/Pricing.jsx';
import BrokerSupport from './pages/BrokerSupport.jsx';
import Resources from './pages/Resources.jsx';
import AddTradeEntry from './components/AddTradeEntry.jsx';
import TradeHistory from './components/TradeHistory.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='/*' element={<EmptyPage/>}/>
      <Route path='/features' element={<Feature/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/brokerSupport' element={<BrokerSupport/>}/>
      <Route path='/resources' element={<Resources/>}/>
      <Route path='/newtrade' element={<AddTradeEntry/>}/>
      <Route path='/tradehistory' element={<TradeHistory/>}/>
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