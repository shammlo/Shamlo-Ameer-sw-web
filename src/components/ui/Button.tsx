//********** IMPORTS ************* */
import React, { Component } from 'react';
//******************************** */

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

class Button extends Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
        this.state = {};
    }
    render() {
        return <button className={`btn ${this.props.className}`}>{this.props.children}</button>;
    }
}
export { Button };
