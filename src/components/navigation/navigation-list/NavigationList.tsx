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
                <NavigationItem href="/category/all" title="all" />
                <NavigationItem href="/category/clothes" title="clothes" />
                <NavigationItem href="/category/tech" title="tech" />
            </ul>
        );
    }
}
export { NavigationList };
