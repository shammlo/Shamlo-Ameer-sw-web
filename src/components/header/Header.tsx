//********** IMPORTS ************* */
import { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import Cart from '../cart/Cart';
import { Icon } from '../icon/Icon';
import { Navigation } from '../navigation/Navigation';
import * as actions from '../../store/actions/Actions';
// import { ProductType } from '../../store/types';
//******************************** */
interface HeaderState {
    currencyDropdown: boolean;
    count: number;
}
interface HeaderProps {
    toggleCart: (opened: boolean | undefined) => boolean | void;
    cartOpen: boolean;
    currency: [{ symbol: string; label: string }];
    products: any;
    cart: object[];
    currencySymbol: string;
    changeCurrency: (currency: string, symbol: string) => void;
    notificationCounter: (number: number) => void;
    notificationCount: number;
}

class Header extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {
            currencyDropdown: false,
            count: 0,
        };
    }

    componentDidUpdate(prevProps: any) {
        let currentCount = 0;
        if (prevProps.cart !== this.props.cart) {
            this.props.cart?.forEach((item: any) => {
                currentCount += item?.quantity;
            });
            // this.setState({ count: currentCount });
            this.props.notificationCounter(currentCount);
        }
    }

    toggleCurrencyDropdown = () =>
        this.setState({ currencyDropdown: !this.state.currencyDropdown });

    changeCurrency = (currency: string, symbol: string) => {
        this.props.changeCurrency(currency, symbol);
    };
    render() {
        return (
            <header className="header">
                <Wrapper class="container">
                    <Wrapper class="header__wrapper">
                        <Navigation toggleCart={this.props.toggleCart} />
                        <Wrapper class="header__logo">
                            <Icon title="logo" />
                        </Wrapper>

                        <Wrapper class="header__action ">
                            <Wrapper
                                class="header__action--currency"
                                clicked={this.toggleCurrencyDropdown}
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
                                                            this.changeCurrency(
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
                            </Wrapper>
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
        products: any;
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

    notificationCounter: (count: number) =>
        dispatch(actions.productData.notificationCounter(count)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
