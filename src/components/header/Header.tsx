//********** IMPORTS ************* */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import Cart from '../cart/Cart';
import { Icon } from '../icon/Icon';
import { Navigation } from '../navigation/Navigation';
import * as actions from '../../store/actions/Actions';
import { ProductType } from '../../store/types';
import { Link } from 'react-router-dom';
//******************************** */
interface HeaderState {
    currencyDropdown: boolean;
    count: number;
}
interface HeaderProps {
    toggleCart: (opened: boolean | undefined) => boolean | void;
    cartOpen: boolean;
    currency: [{ symbol: string; label: string }];
    products: ProductType;
    cart: object[];
    currencySymbol: string;
    changeCurrency: (currency: string, symbol: string) => void;
    notificationCount: number;
}

class Header extends Component<HeaderProps, HeaderState> {
    currencyDrop: React.RefObject<any>;
    constructor(props: HeaderProps) {
        super(props);
        this.state = {
            currencyDropdown: false,
            count: 0,
        };
        this.currencyDrop = React.createRef();
    }
    componentDidMount() {
        document.addEventListener('click', this.toggleCurrencyDropdown.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.toggleCurrencyDropdown.bind(this), true);
    }

    // ----------------------------------------------------------------
    // ********** CUSTOM FUNCTIONS ************* */

    //- Toggle currency dropdown, and close the dropdown when clicked outside
    toggleCurrencyDropdown = (event: Event) => {
        if (this.currencyDrop.current && !this.currencyDrop.current.contains(event.target)) {
            this.setState({ currencyDropdown: false });
        } else if (this.currencyDrop.current && this.currencyDrop.current.contains(event.target)) {
            this.setState({ currencyDropdown: true });
        }
    };

    // ----------------------------------------------------------------
    // ********** RENDER ************* */
    render() {
        return (
            <header className="header">
                <Wrapper class="container">
                    <Wrapper class="header__wrapper">
                        <Navigation toggleCart={this.props.toggleCart} />
                        <Wrapper class="header__logo">
                            <Link to="/category/all">
                                <Icon title="logo" />
                            </Link>
                        </Wrapper>

                        <Wrapper class="header__action ">
                            <div
                                className="header__action--currency"
                                // onClick={this.toggleCurrencyDropdown}
                                ref={this.currencyDrop}
                            >
                                <p>{this.props.currencySymbol}</p>
                                <Icon
                                    title={this.state.currencyDropdown ? 'arrow-down' : 'arrow-up'}
                                />
                                {/* //* Currency dropdown */}
                                <Wrapper
                                    class={`currency-dropdown ${
                                        this.state.currencyDropdown
                                            ? this.props.cartOpen
                                                ? 'cart closed'
                                                : 'opened'
                                            : ''
                                    }`}
                                >
                                    <ul>
                                        {this.props.currency?.map(
                                            (currency: { symbol: string; label: string }) => {
                                                return (
                                                    <li
                                                        key={currency.label}
                                                        onClick={() =>
                                                            this.props.changeCurrency(
                                                                currency.label,
                                                                currency.symbol
                                                            )
                                                        }
                                                    >
                                                        {currency.symbol}&nbsp;&nbsp;
                                                        {currency.label}
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </Wrapper>
                            </div>
                            <Wrapper
                                class="header__action--cart"
                                clicked={() => this.props.toggleCart(undefined)}
                            >
                                <Icon title="cart" />
                                <Wrapper
                                    class="header__action--notification center"
                                    clicked={() => this.props.toggleCart(undefined)}
                                >
                                    <span>{this.props.notificationCount}</span>
                                </Wrapper>
                            </Wrapper>

                            {/* //* Cart */}
                            <Cart open={this.props.cartOpen} toggleCart={this.props.toggleCart} />
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
            </header>
        );
    }
}

// ----------------------------------------------------------------
const mapStateToProps = (state: {
    productData: {
        products: ProductType;
        currency: [{ symbol: string; label: string }];
        cart: object[];
        currencySymbol: string;
        notificationCount: number;
    };
}) => ({
    currency: state.productData.currency,
    products: state.productData.products,
    cart: state.productData.cart,
    currencySymbol: state.productData.currencySymbol,
    notificationCount: state.productData.notificationCount,
});

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
    changeCurrency: (currency: string, symbol: string) =>
        dispatch(actions.productData.changeCurrency(currency, symbol)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
