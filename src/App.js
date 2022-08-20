import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Full from './full'
import Simple from './simple'
import Control from './control';

function App() {
 
  return <BrowserRouter>
    <Routes>
      <Route path="/simple" element={<Simple />}>
      </Route>
      <Route path="/control" element={<Control />}>
      </Route>
      <Route path="/" element={<Full />}>
      </Route>
    </Routes> 
  </BrowserRouter>
}

export default App;
