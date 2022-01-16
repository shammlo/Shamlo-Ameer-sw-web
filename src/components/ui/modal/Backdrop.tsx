//********** IMPORTS ************* */
import { Component } from 'react';
//******************************** */

interface BackdropProps {
    show: boolean;
    clicked: () => void;
}

class Backdrop extends Component<BackdropProps> {
    constructor(props: BackdropProps) {
        super(props);
        this.state = {};
    }
    render() {
        const { show, clicked } = this.props;
        return show ? <div className="backdrop" onClick={clicked}></div> : null;
    }
}
export { Backdrop };
