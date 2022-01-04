//********** IMPORTS ************* */
import React, { Component } from 'react';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
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
            <Wrapper class="nav">
                <NavigationList />
            </Wrapper>
        );
    }
}
export { Navigation };
