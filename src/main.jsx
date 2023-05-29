import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { Auth0Provider } from '@auth0/auth0-react'

// domain - dev-507sjovwsn6rdunr.us.auth0.com
// clientID - 5VExEGW0g0EOAST0jxK6Nqj48PnTyThz
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Auth0Provider
    domain="dev-507sjovwsn6rdunr.us.auth0.com"
    clientId="5VExEGW0g0EOAST0jxK6Nqj48PnTyThz"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation="localstorage"
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
)
