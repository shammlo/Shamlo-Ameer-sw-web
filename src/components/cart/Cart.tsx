//********** IMPORTS ************* */
import React, { Component } from 'react';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import { CartCard } from './cart-card/CartCard';
//******************************** */

interface CartProps {
    open: boolean;
}

class Cart extends Component<CartProps> {
    constructor(props: CartProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Wrapper class={`cart ${this.props.open && 'opened'}`}>
                <Wrapper class="cart__wrapper">
                    <Wrapper class="cart__header">
                        <h2 className="cart__header--title">
                            My Bag, <span className="cart__header--subtitle">2 Items</span>
                        </h2>
                    </Wrapper>
                    <Wrapper class="cart__body">
                        <CartCard />
                        <CartCard />
                    </Wrapper>
                    <Wrapper class="cart__footer">
                        <Wrapper class="cart__footer--payment">
                            <h3 className="cart__footer--total">Total</h3>
                            <h3 className="cart__footer--price">$100.00</h3>
                        </Wrapper>
                        <Wrapper class="cart__footer--buttons">
                            <button className="btn btn-bag">
                                <p>view bag</p>
                            </button>
                            <button className="btn btn-checkout" value="checkout">
                                <p>Checkout</p>
                            </button>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        );
    }
}
export { Cart };
