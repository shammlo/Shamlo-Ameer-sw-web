//********** IMPORTS ************* */
import React, { Component } from 'react';
import { numberWithCommas } from '../../../utils/helper-functions/helperFunctions';
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
    removeItem?: () => void;
    selectedAttrs: {
        [key: string]: {
            [key: string]: string;
        };
    };
    decreaseQuantity: () => void;
    increaseQuantity: () => void;
    totalPrice: number;
}

class CartCard extends Component<CartCardProps> {
    constructor(props: CartCardProps) {
        super(props);
        this.state = {};
    }

    // ----------------------------------------------------------------
    // **************** RENDER ***************** */
    render() {
        const { name, brand, prices, img, quantity, selectedAttrs, totalPrice } = this.props;

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
                    <p className={`cart__card--price ${!selectedAttrs ? 'mb-10' : ''}`}>
                        {selectedCurrency.currency.symbol}
                        {numberWithCommas(totalPrice)}
                    </p>
                    {selectedAttrs ? (
                        <Wrapper class="cart__card--buttons">
                            {Object.values(selectedAttrs)?.map((attribute: any, index: number) => {
                                return (
                                    <Wrapper class="radio" key={attribute.id}>
                                        <input
                                            type="radio"
                                            name="Selected Attribute"
                                            className="radio-btn"
                                            value={attribute.id}
                                            id={attribute.id}
                                            defaultChecked={index === 0 ? true : false}
                                        />
                                        <label
                                            className={`radio-label ${
                                                attribute.value.includes('#') ? 'colored' : 'sized'
                                            }`}
                                            htmlFor={attribute.id}
                                            style={{
                                                backgroundColor: attribute.value,
                                            }}
                                        >
                                            <span>
                                                {attribute.value.includes('#')
                                                    ? ''
                                                    : attribute.value}
                                            </span>
                                        </label>
                                    </Wrapper>
                                );
                            })}
                        </Wrapper>
                    ) : null}
                </Wrapper>
                <Wrapper class="cart__card--right">
                    <Wrapper class="cart__card--btn">
                        <button
                            className="btn btn-norm"
                            value="inc"
                            onClick={this.props.increaseQuantity}
                        >
                            +
                        </button>
                        <p className="cart__card--quantity">{quantity}</p>
                        <button
                            className="btn btn-norm"
                            value="dec"
                            onClick={this.props.decreaseQuantity}
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
export default React.memo(CartCard);
