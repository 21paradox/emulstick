import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Full from './full'
import Simple from './simple'

function App() {
 
  return <BrowserRouter>
    <Routes>
      <Route path="/simple" element={<Simple />}>
      </Route>
      <Route path="/" element={<Full />}>
      </Route>
    </Routes> 
  </BrowserRouter>
}

export default App;
