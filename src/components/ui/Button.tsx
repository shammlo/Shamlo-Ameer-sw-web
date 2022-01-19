//********** IMPORTS ************* */
import React, { Component } from 'react';
//******************************** */

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    clicked?: (args: any) => void;
    value?: string;
}

class Button extends Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <button
                className={`btn ${this.props.className}`}
                style={this.props.style}
                onClick={this.props.clicked}
                value={this.props.value}
            >
                {this.props.children}
            </button>
        );
    }
}
export { Button };
