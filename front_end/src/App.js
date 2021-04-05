import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SuperAdminLogin from './components/SuperAdminLogin'
import NavBar from './components/NavBar'
import NormalAdmin from './components/NormalAdmin';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import AdminDashboard from './components/AdminDashboard'
import AdminReset from './components/AdminReset';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister'
import UserHome from './components/UserHome';
import UserDashboard from './components/UserDashboard';
import SellerReset from './components/SellerReset';
import AccountSuspend from './components/AccountSusp';
import Paypal from './components/paypal/paypal';
import Success from './components/paypal/success';

function App() {
  return (
    <Router>
      <div className="">
        <Route path="/" exact component={NavBar} />
        <Switch>
          <Route path="/SuperAdminLogin" exact component={SuperAdminLogin} />
          <Route path="/AdminLogin" exact component={NormalAdmin} />
          <Route path="/SuperDashboard" exact component={SuperAdminDashboard} />
          <Route path="/AdminDashboard" exact component={AdminDashboard} />
          <Route path="/ResetPassword" exact component={AdminReset} />
          <Route path="/UserRegister" exact component={UserRegister} />
          <Route path="/UserLogin" exact component={UserLogin} />
          <Route path="/Home" exact component={UserHome} />
          <Route path="/SellerDashboard" exact component={UserDashboard} />
          <Route path="/SellerReset" exact component={SellerReset} />
          <Route path="/Suspended" exact component={AccountSuspend} />
          <Route path="/payment" exact component={Paypal} />
          <Route path="/Success" exact component={Success} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
