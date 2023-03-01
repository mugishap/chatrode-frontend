import React from 'react'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import './index.css'
import { Provider } from "react-redux";
import { persistor, store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <PersistGate persistor={persistor} loading={<div>loading</div>}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
)