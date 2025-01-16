import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,Route,createBrowserRouter, createRoutesFromChildren, createRoutesFromElements } 
from 'react-router-dom'
import { Provider } from 'react-redux';
import  store  from './store/store.js';
import { AuthLayout,Login,Signup} from './components/index.js';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path: '/',
        element: <div>Welcome to BlogHub</div>,  
      },
      {
        path:'/login',
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:'/signup',
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
    ]
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
