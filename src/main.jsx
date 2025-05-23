import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,Route,createBrowserRouter, createRoutesFromChildren, createRoutesFromElements } 
from 'react-router-dom'
import { Provider } from 'react-redux';
import  store  from './store/store.js';
import { AuthLayout,Login,Signup} from './components/index.js';
import Home from './pages/Home.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'

import Post from './pages/Post.jsx'
import MyPosts from './pages/MyPosts.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path: '/',
        element: (
          <Home />
        )
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
      {
        path:'/MyPost',
        element:(
          <AuthLayout authentication>
            <MyPosts/>
          </AuthLayout>
        )
      },
      {
        path:"/Write",
        element:(
          <AuthLayout authentication> 
              {""}
              <AddPost/>
          </AuthLayout>
        )
      },
      {
        path:"edit-post/:slug",
        element: (
          <AuthLayout authentication>
              <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
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
