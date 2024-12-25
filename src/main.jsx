import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './Components/Redux.js';
import { Provider } from 'react-redux';


createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <Provider store={store}><App/></Provider>
  
 </BrowserRouter>

)
