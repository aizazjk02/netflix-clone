import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';

// import { store } from './app/store';
import { UserContextProvider } from './context/user.context';
import App from "./App"
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
// {

//   <Provider store={store}>
//   </Provider>
// }


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);



