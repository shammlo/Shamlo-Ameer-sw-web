//********** IMPORTS ************* */
import { Component } from 'react';
import Wrapper from '../../../utils/Hoc/Wrappers/Wrapper';
import { Icon } from '../../icon/Icon';
import { Backdrop } from './Backdrop';

//******************************** */

interface ModalProps {
    open: boolean;
    modalHandler: () => void;
}

class Modal extends Component<ModalProps> {
    constructor(props: ModalProps) {
        super(props);
        this.state = {};
    }
    render() {
        const { open, modalHandler, children } = this.props;
        return (
            <Wrapper
                class="modal"
                style={{
                    transform: open ? 'translateY(0)' : 'translateY(-200vh)',
                    opacity: open ? '1' : '0',
                }}
            >
                <Backdrop show={open} clicked={modalHandler} />
                <Wrapper class="modal-overlay">
                    <Wrapper class="modal-content">
                        <Wrapper class="modal-close" clicked={modalHandler}>
                            <Icon title="close" />
                        </Wrapper>
                        <p>Note: Another way is create a checkout page instead.</p>
                        {children}
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        );
    }
}
export { Modal };
