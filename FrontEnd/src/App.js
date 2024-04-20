import './App.css';
import 'react-responsive-modal/styles.css';

import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import Logout from './pages/Logout/Logout';
import Home from './pages/Home/Home';
import PersonalDetails from './pages/PersonalDetails/PersonalDetails';
import CaseDetails from './pages/Cases/Cases';
import Dashboard from './pages/Dashboard/Dashboard';
import AddUser from './pages/AddUser/AddUser';
import AddCase from './pages/AddCase/AddCase';
import PrisonerDetails from './pages/PrisonerDetails/PrisonerDetails';
import SelectLawyers from './pages/SelectLawyers/SelectLawyers';
import SelectCounselors from './pages/SelectCounselors/SelectCounselors';
import { isAuthenticated, isCounselor, isLawyer, isPrisoner, isSuperAdmin } from './helpers/helper';
import LawyerDetails from './pages/LawyerDetails/LawyerDetails';
import CounselorDetails from './pages/CounselorDetails/CounselorDetails';

import Testui from './test/Testui';
import Test1 from './test/Test1';
import Test2 from './test/Test2';
import Test3 from './test/Test3';
import Test4 from './test/Test4';
import Test5 from './test/Test5';


function App() {
  const PrisonerRoute = () => {
    return isAuthenticated() && isPrisoner() ? <Outlet /> : <Navigate to='/login' />
  }
  const LawyerRoute = () => {
    return isAuthenticated() && isLawyer() ? <Outlet /> : <Navigate to='/login' />
  }
  const CounselorRoute = () => {
    return isAuthenticated() && isCounselor() ? <Outlet /> : <Navigate to='/login' />
  }
  const AdminRoute = () => {
    return isAuthenticated() && isSuperAdmin() ? <Outlet /> : <Navigate to='/login' />
  }

  return (
    <Router>
      <Routes>
        {/* <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/campaign/:campaignId" element={<Campaign />} />
          <Route path="/campaign/add" element={<AddCampaign />} />
        </Route> */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />

        <Route path="/profile" element={<PersonalDetails />} />
        <Route path="/dashboard/prisoners" element={<Dashboard type='prisoners' />} />
        <Route path="/dashboard/lawyers" element={<Dashboard type='lawyers' />} />
        <Route path="/dashboard/counselors" element={<Dashboard type='counselors' />} />

        <Route path="/case/add" element={<AddCase />} />
        <Route path="/lawyers/add" element={<AddUser type='lawyers' />} />
        <Route path="/counselors/add" element={<AddUser type='counselors' />} />
        <Route path="/prisoners/add" element={<AddUser type='prisoners' />} />
        <Route path="/lawyers/edit/:user_id" element={<AddUser type='lawyers' pageType='edit' />} />
        <Route path="/counselors/edit/:user_id" element={<AddUser type='counselors' pageType='edit' />} />
        <Route path="/prisoners/edit/:user_id" element={<AddUser type='prisoners' pageType='edit' />} />

        <Route path="/users/prisoner/:user_id" element={<PrisonerDetails />} />
        <Route path="/users/prisoner/:user_id/lawyers" element={<SelectLawyers />} />
        <Route path="/users/prisoner/:user_id/counselors" element={<SelectCounselors />} />

        <Route path="/users/lawyer/:user_id" element={<LawyerDetails />} />
        <Route path="/users/counselor/:user_id" element={<CounselorDetails />} />


        <Route path="/users/prisoner/:user_id" element={<PrisonerDetails />} />

        <Route path="/users/admin/:user_id" element={<PrisonerDetails />} />

        <Route path="/users/:user_id" element={<PersonalDetails />} />
        <Route path="/case/:case_id" element={<CaseDetails />} />
        <Route path="/admin/login" element={<LoginPage type="admin" />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/test" element={<Testui />} />
        <Route path='/test/test1' element={<Test1 />} />
        <Route path='/test/test2' element={<Test2 />} />
        <Route path='/test/test3' element={<Test3 />} />
        <Route path='/test/test4' element={<Test4 />} />
        <Route path='/test/test5' element={<Test5 />} />


              
        </Routes>
    </Router>
  );
}

export default App;