//********** IMPORTS ************* */
import React, { Component } from 'react';
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
        const active = this.props.active ? 'active' : '';

        // Could use this approach if you want to use (a)tag other than a simple span
        //  <a href={this.props.href} className="nav__item--link">
        //     <span className="nav__item--title">{this.props.title}</span>
        // </a>
        return (
            <li className={`nav__item ${active}`}>
                <span className="nav__item--title">{this.props.title}</span>

                {this.props.active ? <div className="active-item"></div> : null}
            </li>
        );
    }
}
export { NavigationItem };
