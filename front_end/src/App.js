import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SuperAdminLogin from './components/SuperAdminLogin'
import NavBar from './components/NavBar'
import NormalAdmin from './components/NormalAdmin';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminDashboard from './components/AdminDashboard'

function App() {
  return (
    <Router>
      <div className="">
        <Route path="/" exact component={NavBar} />
        <Switch>
          <Route path="/SuperAdminLogin" exact component={SuperAdminLogin} />
          <Route path="/NormalAdmin" exact component={NormalAdmin} />
          <Route path="/SuperDashboard" exact component={SuperAdminDashboard} />
          <Route path="/AdminDashboard" exact component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
