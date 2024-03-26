
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AdminDashboard from './screens/admin/AdminDashboard';
import AdminLogin from './screens/admin/AdminLogin';
import Concern from './screens/admin/Concern';
import Home from './screens/userinterface/Home';
import PlusMinusComponent from './components/userinterface/PlusMinusComponent';
import ProductDetails from './screens/admin/ProductDetails';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AdminLogin/>} path='/adminlogin' />
          <Route element={<AdminDashboard/>} path='/admindashboard/*' />
          <Route element={<Concern/>} path='/concern' />  
          <Route element={<Home/>} path='/home' /> 
          <Route element={<ProductDetails/>} path='/productdetails' />
          <Route element={<PlusMinusComponent/>} path='/PlusMinus' />
       </Routes>
      </Router>
    </div>
  );
}

export default App;
 