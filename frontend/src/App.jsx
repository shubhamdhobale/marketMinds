import { Route , RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Layout from './components/Layout';
import EmptyPage from './components/EmptyPage';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';
import Feature from './pages/Feature.jsx';
import Pricing from './pages/Pricing.jsx';
import BrokerSupport from './pages/BrokerSupport.jsx';
import Resources from './pages/Resources.jsx';
import AddTradeEntry from './components/AddTradeEntry.jsx';
import TradeHistory from './components/TradeHistory.jsx';
import TradeSummary from './components/TradeSummary.jsx';
import EquityCurveChart from './components/EquityCurveChart.jsx';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import PaymentSuccess from './components/PaymentSuccess.jsx';


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
      <Route path='/tradesummary' element={<TradeSummary/>}/>
      <Route path='/equitychart' element={<EquityCurveChart/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
      </Route>
      <Route path="/paymentsuccess" element={<PaymentSuccess />}/>
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/termsofservices" element={<TermsOfService />} />
    </Route>
  )
);

const App = () => {
  return (
    <div className='bg-[#E2E8F0] box-border min-h-screen flex flex-col'>
      <RouterProvider router={router} />
      < Toaster />
      <ToastContainer/>
    </div>
  )
}

export default App