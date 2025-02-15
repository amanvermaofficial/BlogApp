import React from 'react';
import { Container,LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    console.log(authStatus);
    
    const navigate = useNavigate();
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Write",
            slug: '/Write',
            active: authStatus 
        },
        {
            name: "MyPost",
            slug: '/MyPost',
            active: authStatus
        },
        {
            name: "Login",
            slug: '/login',
            active: !authStatus
        },
        {
            name: "Signup",
            slug: '/signup',
            active: !authStatus
        }
    ]
    return (
        <header className="py-4 px-4 md:px-6 lg:px-8 bg-white shadow-md z-10">
            <Container>
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 flex-col md:flex-row">
                    <Link to="/" className="logo text-2xl font-bold text-gray-800 landing-page-headline">
                        BlogHub
                    </Link>

                    <nav className="flex">
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

                    {/* {!authStatus && (
                        <div className="flex items-center space-x-4">
                            <li className='list-none'>
                                <button onClick={()=> {console.log("Login button clicked");
                                    navigate('/login')}} className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-950 transition-colors" >
                                    Login
                                </button>
                            </li>
                            <li className='list-none'>
                                <button onClick={(e)=>{
                                      e.stopPropagation(); // Prevent event bubbling
                                    navigate('/signup')}}  className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-950 transition-colors">
                                    Sign Up
                                </button>
                            </li>
                        </div> 
                    )} */}
                </div>
            </Container>
        </header>
    );
}

export default Header;
