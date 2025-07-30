import './App.css';
import { BrowserRouter as Router , Routes , Route  } from 'react-router-dom';
import Home from './components/Home';
import OrderForm from './components/OrderForm';
import {Provider} from 'react-redux'
import { store } from './components/store';
import ViewOrders from './components/ViewOrders';
import EditOrder from './components/EditOrder';

function App() {
  return (
    <Provider store={store}>
    <div>
<Router>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/create' element={<OrderForm/>} />
    <Route path='/orders' element={<ViewOrders/>} />
    <Route path='/edit/:id' element={<EditOrder/>} />


  </Routes>
</Router>

    </div>
    </Provider>

  );
}

export default App;
