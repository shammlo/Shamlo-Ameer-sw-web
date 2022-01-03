//********** IMPORTS ************* */
import React, { Component } from 'react';
//******************************** */

interface HeaderProps {}

class Header extends Component {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {};
    }
    render() {
        return <header className="header">Iam header</header>;
    }
}
export { Header };
