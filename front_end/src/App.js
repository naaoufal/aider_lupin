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
          <Route path="/UserHome" exact component={UserHome} />
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
