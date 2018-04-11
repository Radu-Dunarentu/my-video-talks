import React from 'react';
import { Link } from 'react-router-dom'
import '../index.css';


class Header extends React.Component {

    render() {
        return (
            <div className="vt-header">
                <div className="flex">
                    <Link to="/" className="vt-header-item"> top </Link>
                    <Link to="/create" className="vt-header-item"> create </Link>
                </div>
            </div>

        )
    }
}

export default Header