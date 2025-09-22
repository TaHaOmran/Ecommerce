import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import { CartContext } from '../../context/CartContext'

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    let navigate = useNavigate()
    let { UserToken, setUserToken } = useContext(UserContext);

    let { cart } = useContext(CartContext);
    function logOut() {
        localStorage.removeItem('token');
        setUserToken(null);
        navigate('/login')
    }

return <>
<header className="fixed inset-x-0 top-0 z-50 bg-gray-200">
    <nav className="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
        <div className="flex">
        <div  className="me-3 cursor-pointer">
            <img className="w-30" src={logo} alt='' />
        </div>
        </div>
        <div className="flex lg:hidden">
        <button onClick={ ()=> setIsOpen(true)} type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-gray-200 hover:bg-gray-300  focus:ring-gray-300 ">
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
        </div>
            {UserToken &&
                <div className='flex justify-center'>
                    <div className="hidden lg:flex lg:gap-x-4">
                        <NavLink to={'home'} className="text-sm/6  text-gray-600">Home</NavLink>
                        <NavLink to={'products'} className="text-sm/6  text-gray-600">Products</NavLink>
                        {/* <NavLink to={'categories'} className="text-sm/6  text-gray-600">Categories</NavLink>
                        <NavLink to={'brands'} className="text-sm/6  text-gray-600">Brands</NavLink> */}
                        <NavLink to={'allorders'} className="text-sm/6  text-gray-600">All Orders</NavLink>
                    </div>
                </div>
            }
        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
                {UserToken ?
                    <>
                    <NavLink to="wishlist" className={({ isActive }) => `relative transition hover:text-red-700 ${
                        isActive ? "text-red-600" : "text-red-600"
                        }`
                    }
                    >
                        <i className="fas fa-heart fa-lg"></i>
                    </NavLink>
                    <NavLink to="cart" className="relative me-4 text-gray-600 hover:text-main transition">
                        <i className="fas fa-shopping-cart fa-lg"></i>
                        {cart?.numOfCartItems > 0 && (
                            <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cart.numOfCartItems}
                            </span>
                        )}
                    </NavLink>

                    <span onClick={() => logOut()} className="text-sm/6  text-gray-600 cursor-pointer">Logout </span>
                    </>
                    :
                <>  <NavLink to={'/'} className="text-sm/6  text-gray-600">Register </NavLink> <NavLink to={'Login'} className="text-sm/6  text-gray-600">Login </NavLink> </>
            }
        
        
        </div>
    </nav>
    {/* Mobile menu, show/hide based on menu open state. */}
    <div className={isOpen ? "lg:hidden" : 'hidden' } role="dialog" aria-modal="true">
        {/* Background backdrop, show/hide based on slide-over state. */}
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
            <NavLink to={''} className="me-3">
                <img className="w-30" src={logo} alt='' />
            </NavLink>
            <button onClick={()=> setIsOpen(false)} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700 bg-white hover:bg-light focus:ring-light">
            <span className="sr-only">Close menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
        <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
                {UserToken &&
                    <div className="space-y-2 py-6">
                        <NavLink to={'home'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7  text-gray-600 hover:bg-gray-50">Home</NavLink>
                        <NavLink to={'wishlist'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7  text-gray-600 hover:bg-gray-50">Wishlist</NavLink>
                        <NavLink to={'products'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7  text-gray-600 hover:bg-gray-50">Products</NavLink>
                        <NavLink to={'allorders'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7  text-gray-600 hover:bg-gray-50">All Orders</NavLink>
                        {/* <NavLink to={'categories'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7  text-gray-600 hover:bg-gray-50">Categories</NavLink>
                        <NavLink to={'brands'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7  text-gray-600 hover:bg-gray-50">Brands</NavLink> */}
                    </div>
                }
                <div className="py-6">
                {UserToken ? <span onClick={()=> logOut()} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7  text-gray-600 hover:bg-gray-50 cursor-pointer">Logout</span>
                    :<><NavLink to={''} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7  text-gray-600 hover:bg-gray-50">Register</NavLink> <NavLink to={'login'} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7  text-gray-600 hover:bg-gray-50">Login</NavLink></>
                }
                
                
            </div>
            </div>
        </div>
        </div>
    </div>
</header>

</>
}
