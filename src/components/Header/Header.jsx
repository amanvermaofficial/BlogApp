// import React from 'react'
// import {Link} from 'react-router-dom'
// import {useNavigate} from 'react-router-dom'
// import { useSelector } from 'react-redux'

// function Header(){
//     const authStatus = useSelector((state)=>state.auth.status);
//     const navigate = useNavigate();
//     const navItems = [
//         {
//             name:'Home',
//             slug:'/',
//             active:true
//         },
//         {
//             name:'Login',
//             slug:'/login',
//             active:!authStatus
//         },
//         {
//             name:'Signup',
//             slug:'/Signup',
//             active:!authStatus
//         },
//         {
//             name:'All Post',
//             slug:'/all-posts',
//             active:!authStatus
//         },
//         {
//             name:'Add Post',
//             slug:'/add-post',
//             active:!authStatus
//         }
//     ] 
// }

// export default Header;

import React from 'react';
import { Container,LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();
    const navItems = [
        {
            name: "Blog",
            path: "/",
            active: true
        },
        {
            name: "Write",
            path: '/Write',
            active: true
        },
        {
            name: "MyPost",
            path: '/MyPost',
            active: authStatus
        },
        {
            name: "Contact",
            path: '/Contact',
            active: !authStatus
        }
    ]
    return (
        <header className="py-4 px-4 md:px-6 lg:px-8 bg-white shadow-md">
            <Container>
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        BlogHub
                    </Link>

                    {/* Navigation */}
                    <nav className="">
                        {/* <Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                Blog
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
            </Link> */}


                        <ul className='flex items-center space-x-6'>
                            {
                                navItems.map((item) => item.active ? (
                                    <li key={item.name}>
                                        <button onClick={() => navigate(item.slug)}
                                        >{item.name}</button>
                                    </li>
                                ) : null)
                            }

                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </nav>

                    {!authStatus && (
                        <div className="flex items-center space-x-4">
                            <li className='list-none'>
                                <button className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-950 transition-colors" >
                                    Login
                                </button>
                            </li>
                            <li className='list-none'>
                                <button className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-950 transition-colors">
                                    Sign Up
                                </button>
                            </li>
                        </div>
                    )}
                </div>
            </Container>
        </header>
    );
}

export default Header;
