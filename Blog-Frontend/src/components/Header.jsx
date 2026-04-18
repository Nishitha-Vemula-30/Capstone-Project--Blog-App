import React from 'react'
import { NavLink } from "react-router"
function Header() {
  return (
    <div>
      <nav>
            <ul className="flex gap-10">
                <li>
                    <NavLink to="home" className={({isActive})=>isActive?"text-red-700 bg-yellow-300 p-2":""}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="register"  className={({isActive})=>isActive?"text-red-700 bg-yellow-300 p-2":""}>Register</NavLink>
                </li>
                <li>
                    <NavLink to="login"  className={({isActive})=>isActive?"text-red-700 bg-yellow-300 p-2":""}>Login</NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Header