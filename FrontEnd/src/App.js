import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import PrisonerDetails from './components/PrisonerDetails/PrisonerDetails';
import SortedList from './components/LawyerDetails/SortedList';
import SortedCounselors from './components/CounselorDetails/SortedCounselors';
import Home from './components/Home/Nav';


function App() {
  return (
    <Router>
    <Routes>
      
    <Route path="/" element={<Home />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/prisonerdetails" element={<PrisonerDetails />} />
      <Route path="/lawyerdetails" element={<SortedList />} />
      <Route path="/counselordetails" element={<SortedCounselors />} />



      
    </Routes>
  </Router>
  );
}

export default App;