//********** IMPORTS ************* */
import React, { Component } from 'react';
import { NavigationList } from './navigation-list/NavigationList';
//******************************** */

interface NavigationProps {}

class Navigation extends Component {
    constructor(props: NavigationProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <nav className="nav">
                <NavigationList />
            </nav>
        );
    }
}
export { Navigation };
