//********** IMPORTS ************* */
import React, { Component } from 'react';
import { NavigationItem } from './navigation-items/NavigationItem';
//******************************** */

interface NavigationListProps {}

class NavigationList extends Component {
    constructor(props: NavigationListProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <ul className="nav__list">
                <NavigationItem href="#" title="women" active />
                <NavigationItem href="#" title="men" />
                <NavigationItem href="#" title="kids" />
            </ul>
        );
    }
}
export { NavigationList };
