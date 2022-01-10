//********** IMPORTS ************* */
import React, { Component } from 'react';
import Wrapper from '../../../utils/Hoc/Wrappers/Wrapper';
import { Button } from '../../ui/Button';
//******************************** */

interface CartCardProps {
    id: string;
    name: string;
    brand: string;
    prices: object[];
    img: string;
    symbol: string;
    quantity: number;
    currencyValue: string;
    removeItem: () => void;
    attributes?: any;
    // changeQuantity: (id: string | undefined, quantity: number | string) => void;
    decreaseQuantity: (id: string) => void;
    increaseQuantity: (id: string) => void;
}

class CartCard extends Component<CartCardProps> {
    constructor(props: CartCardProps) {
        super(props);
        this.state = {};
    }

    // increaseQuantity = () => {
    //     this.props.changeQuantity(this.props.id, this.props.quantity + 1);
    // };
    // decreaseQuantity = () => {
    //     this.props.changeQuantity(this.props.id, this.props.quantity - 1);
    //     this.props.removeItem();
    // };

    // quantityHandler = (operator: string | number) => {
    //     if (operator === 'inc') {
    //         return this.props.changeQuantity(this.props.id, operator);
    //     }
    //     if (operator === 'dec') {
    //         this.props.changeQuantity(this.props.id, operator);
    //     }
    // };

    // ----------------------------------------------------------------
    // **************** RENDER ***************** */
    render() {
        const { id, name, brand, prices, img, quantity, attributes } = this.props;

        const selectedCurrency: any = prices.find(
            (prices: any) => prices.currency.label === this.props.currencyValue
        );
        return (
            <Wrapper class="cart__card">
                <Wrapper class="cart__card--left">
                    <h3 className="cart__card--title">
                        <span className="brand">{name}</span>
                        <span>{brand}</span>
                    </h3>
                    <p className="cart__card--price">
                        {selectedCurrency?.currency?.symbol}
                        {selectedCurrency?.amount}
                    </p>
                    <Wrapper class="cart__card--buttons">
                        {Object.values(attributes)?.map((attribute: any) => {
                            return (
                                <Button
                                    className={attribute.value.includes('#') ? 'color' : ''}
                                    key={attribute.id}
                                    style={{
                                        backgroundColor: attribute.value,
                                        border: '1px solid' + attribute.value,
                                    }}
                                >
                                    <span>
                                        {attribute.value?.includes('#') ? '' : attribute.value}
                                    </span>
                                </Button>
                            );
                        })}
                    </Wrapper>
                </Wrapper>
                <Wrapper class="cart__card--right">
                    <Wrapper class="cart__card--btn">
                        <button
                            className="btn btn-norm"
                            value="inc"
                            onClick={() => this.props.increaseQuantity(id)}
                        >
                            +
                        </button>
                        <p className="cart__card--quantity">{quantity}</p>
                        <button
                            className="btn btn-norm"
                            value="dec"
                            onClick={() => this.props.decreaseQuantity(id)}
                        >
                            −
                        </button>
                    </Wrapper>
                    <Wrapper class="cart__card--img">
                        <img src={img} alt="cart item" />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        );
    }
}
export { CartCard };
