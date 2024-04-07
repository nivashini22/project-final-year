import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import Logout from './pages/Logout/Logout';
import Home from './pages/Home/Home';
import PersonalDetails from './pages/PersonalDetails/PersonalDetails';
import CaseDetails from './pages/Cases/Cases';
import Dashboard from './pages/Dashboard/Dashboard';
import AddUser from './pages/AddUser/AddUser';
import AddCase from './pages/AddCase/AddCase';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />

        <Route path="/profile" element={<PersonalDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/case/add" element={<AddCase />} />
        <Route path="/lawyers/add" element={<AddUser type='lawyers' />} />
        <Route path="/counselors/add" element={<AddUser type='counselors' />} />
        <Route path="/prisoners/add" element={<AddUser type='prisoners' />} />
        <Route path="/users/edit/:user_id" element={<AddUser pageType='edit' />} />
        <Route path="/users/:user_id" element={<PersonalDetails />} />
        <Route path="/case/:case_id" element={<CaseDetails />} />
        <Route path="/admin/login" element={<LoginPage type="admin" />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;