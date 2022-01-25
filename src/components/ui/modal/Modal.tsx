//********** IMPORTS ************* */
import { Component } from 'react';
import Wrapper from '../../../utils/Hoc/Wrappers/Wrapper';
import { Icon } from '../../icon/Icon';
import { Backdrop } from './Backdrop';

//******************************** */

interface ModalProps {
    open: boolean;
    modalHandler: () => void;
    main?: boolean;
}

class Modal extends Component<ModalProps> {
    constructor(props: ModalProps) {
        super(props);
        this.state = {};
    }
    render() {
        const { open, modalHandler, children, main } = this.props;
        return (
            <Wrapper class={`modal ${open ? 'opened' : 'closed'}`}>
                <Backdrop show={open} clicked={modalHandler} />
                <Wrapper class="modal-overlay">
                    <Wrapper class="modal-content">
                        <Wrapper class="modal-close" clicked={modalHandler}>
                            <Icon title="close" />
                        </Wrapper>
                        {!main && <p>Note: Another way is create a checkout page instead.</p>}
                        {children}
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        );
    }
}
export { Modal };
