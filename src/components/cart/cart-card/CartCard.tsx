//********** IMPORTS ************* */
import React, { Component } from 'react';
import { numberWithCommas } from '../../../utils/helper-functions/helperFunctions';
import Wrapper from '../../../utils/Hoc/Wrappers/Wrapper';
import { Icon } from '../../icon/Icon';
// import { Button } from '../../ui/Button';
//******************************** */

interface CartCardProps {
    id: string;
    name: string;
    brand: string;
    prices: object[];
    gallery: string[];
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
    totalPrice: number | undefined;

    carousel?: boolean;
}

interface CartCardState {
    current: any;
}

class CartCard extends Component<CartCardProps, CartCardState> {
    constructor(props: CartCardProps) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    // ----------------------------------------------------------------
    // **************** CUSTOM FUNCTIONS ***************** */

    nextSlide = () => {
        const length = this.props.gallery.length;

        this.setState({
            current: this.state.current === length - 1 ? 0 : this.state.current + 1,
        });
    };

    prevSlide = () => {
        const length = this.props.gallery.length;
        this.setState({
            current: this.state.current === 0 ? length - 1 : this.state.current - 1,
        });
    };
    // ----------------------------------------------------------------
    // **************** RENDER ***************** */
    render() {
        const { name, brand, prices, gallery, quantity, selectedAttrs } = this.props;
        const selectedCurrency: any = prices?.find((prices: any) =>
            prices.currency.label === this.props.currencyValue ? prices.amount : 0
        );
        // console.log(gallery);
        return (
            <Wrapper class="cart__card">
                <Wrapper class="cart__card--left">
                    <h3 className="cart__card--title">
                        <span className="brand">{name}</span>
                        <span>{brand}</span>
                    </h3>
                    <p className={`cart__card--price ${selectedAttrs ? 'mb-10' : ''}`}>
                        {selectedCurrency?.currency?.symbol}
                        {numberWithCommas(selectedCurrency?.amount)}
                    </p>
                    {selectedAttrs ? (
                        <Wrapper class="cart__card--buttons">
                            {Object.values(selectedAttrs)?.map((attribute: any, index: number) => {
                                return (
                                    <Wrapper class="radio" key={attribute.id + '-' + index}>
                                        <input
                                            type="radio"
                                            name="Selected"
                                            className={`radio-btn ${
                                                attribute.checked ? 'checked' : ''
                                            }`}
                                            value={attribute.id}
                                            id={attribute.id}
                                            // defaultChecked={attribute.checked}
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
                        {this.props.carousel ? (
                            <Wrapper class="carousel">
                                <Wrapper class="carousel__left" clicked={this.prevSlide}>
                                    <Icon title="arrow-left" />
                                </Wrapper>
                                <Wrapper class="carousel__right" clicked={this.nextSlide}>
                                    <Icon title="arrow-right" />
                                </Wrapper>

                                {gallery.map((image: string, index: number) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {index === this.state.current && (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt="cart item"
                                                    className={`${index === 0 ? 'active' : ''}`}
                                                />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </Wrapper>
                        ) : (
                            <img src={gallery[0]} alt="cart item" />
                        )}
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        );
    }
}
export default React.memo(CartCard);
