
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import router from './Router/router.jsx'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import React from 'react'
import ReactDOM from 'react-dom/client'


import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(



  <AuthProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AuthProvider>

)