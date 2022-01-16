//********** IMPORTS ************* */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

//******************************** */

interface NavigationItemProps {
    href: string;
    title: string;
    children?: React.ReactNode;
    active?: boolean;
}

class NavigationItem extends Component<NavigationItemProps> {
    constructor(props: NavigationItemProps) {
        super(props);
        this.state = {};
    }
    render() {
        // Could use this approach if you want to use (a)tag other than a simple span
        //  <a href={this.props.href} className="nav__item--link">
        //     <span className="nav__item--title">{this.props.title}</span>
        // </a>
        return (
            <li className={`nav__item`}>
                <NavLink
                    to={this.props.href}
                    className={({ isActive }) =>
                        isActive ? 'nav__item--link active' : 'nav__item--link'
                    }
                >
                    <span className="nav__item--title">{this.props.title}</span>
                </NavLink>
            </li>
        );
    }
}
export { NavigationItem };
