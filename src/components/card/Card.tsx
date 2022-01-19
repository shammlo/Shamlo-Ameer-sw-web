//********** IMPORTS ************* */
import React, { Component } from 'react';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import { Link } from 'react-router-dom';
import { Icon } from '../icon/Icon';
import { numberWithCommas } from '../../utils/helper-functions/helperFunctions';

//******************************** */

interface CardProps {
    img: string;
    text: string;
    inStock: boolean;
    price: number | undefined;
    id: number | string;
    symbol: string | undefined;
}

class Card extends Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
        this.state = {};
    }
    render() {
        // - Add loader when the data is fetching
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
                        <Link to={`product/${this.props.id}`}>
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
export { Card };
