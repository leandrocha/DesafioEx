import * as React from "react";
import { Link } from "react-router-dom";
import "../Menu/Menu.css"

export default function Menu() {
    return <>
        <nav className='menu_nav'>
            <ul className="menu_ul">
                <li className="menu_li">
                    <Link className='menu_link' to="/">Home</Link>
                </li>
                <li>
                    <Link className='menu_link' to="/Dados">Dados</Link>
                </li>
            </ul>
        </nav>
    </>
}