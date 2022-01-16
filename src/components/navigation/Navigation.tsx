//********** IMPORTS ************* */
import React, { Component } from 'react';
import { NavigationList } from './navigation-list/NavigationList';
//******************************** */

interface NavigationProps {
    toggleCart: (open: boolean | undefined) => void;
}

class Navigation extends Component<NavigationProps> {
    constructor(props: NavigationProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <nav className="nav" onClick={() => this.props.toggleCart}>
                <NavigationList />
            </nav>
        );
    }
}
export { Navigation };
