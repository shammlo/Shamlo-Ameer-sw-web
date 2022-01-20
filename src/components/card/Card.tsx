//********** IMPORTS ************* */
import React, { Component } from 'react';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import { Link } from 'react-router-dom';
import { Icon } from '../icon/Icon';
import { numberWithCommas } from '../../utils/helper-functions/helperFunctions';
import { Attributes } from '../../store/types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/Actions';
//******************************** */

interface CartState {
    hasAttributes: boolean;
}
interface CardProps {
    img: string;
    text: string;
    inStock: boolean;
    price: number | undefined;
    id: string;
    symbol: string | undefined;
    attributes: [Attributes];
    addToCart: (id: string, attributes: string[] | undefined) => void;
}

class Card extends Component<CardProps, CartState> {
    constructor(props: CardProps) {
        super(props);
        this.state = {
            hasAttributes: true,
        };
    }

    // ----------------------------------------------------------------
    // ********** CUSTOM FUNCTIONS ************* */

    addToCart = () => {
        if (this.props.attributes.length) {
            return;
        }
        this.setState({
            hasAttributes: false,
        });

        this.props.addToCart(this.props.id, undefined);
    };

    // ----------------------------------------------------------------
    render() {
        return this.props.id ? (
            <Wrapper class="card">
                <Wrapper class="card__image">
                    <img
                        className="card__image--img"
                        src={this.props.img}
                        alt="Category Items"
                        width="354"
                        height="330"
                    />
                    {this.props.inStock ? (
                        <Link to={`product/${this.props.id}`} onClick={this.addToCart}>
                            <Wrapper class="card__buy">
                                <Wrapper class="card__buy--icon">
                                    <Icon title="buy" />
                                </Wrapper>
                            </Wrapper>
                        </Link>
                    ) : (
                        <Wrapper class="card__info">
                            <span>Out of stock</span>
                        </Wrapper>
                    )}
                </Wrapper>
                <Wrapper class="card__text">{this.props.text}</Wrapper>
                <Wrapper class="card__price">
                    {this.props.symbol}
                    {numberWithCommas(this.props.price)}
                </Wrapper>
            </Wrapper>
        ) : (
            <Wrapper class="card" style={{ minHeight: '300px' }}>
                <Wrapper class="card__image center">
                    <Icon title="skeleton-img" />
                </Wrapper>
                <div className="block2 pulsate"></div>
                <div className="block3 pulsate"></div>
            </Wrapper>
        );
    }
}

// ----------------------------------------------------------------
const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
    addToCart: (id: string, attributes: string[] | undefined) =>
        dispatch(actions.productData.addToCart(id, attributes)),
});

export default connect(null, mapDispatchToProps)(Card);
