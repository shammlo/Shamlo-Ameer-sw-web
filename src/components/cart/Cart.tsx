//********** IMPORTS ************* */
import { Component } from 'react';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import { CartCard } from './cart-card/CartCard';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/Actions';
import { withRouter } from '../../utils/Hoc/withParams';

//******************************** */

interface CartProps {
    open: boolean;
    cart: object[];
    currencyValue: string;
    removeFromCart: (id: string) => void;
    router: any;
    toggleCart: (open: boolean | undefined) => void;
    productsCurrency: object[];
    currencySymbol: string;
    selectedCurr: any;
}
interface CartState {
    totalPrice: number;
    items: number;
}
class Cart extends Component<CartProps, CartState> {
    constructor(props: CartProps) {
        super(props);
        this.state = {
            totalPrice: 0,
            items: 0,
        };
    }

    componentDidUpdate(prevProps: CartProps) {
        let items = 0;
        let price = 0;
        if (
            (prevProps.cart !== this.props.cart &&
                (this.state.totalPrice || this.props.currencyValue)) ||
            prevProps.currencyValue !== this.props.currencyValue
        ) {
            this.props.cart.forEach((item: any) => {
                const selectedCurr = item.prices.find((price: any) =>
                    price.currency.label === this.props.currencyValue
                        ? price.amount
                        : price.currency.amount
                );

                items += item.quantity;
                price += item.quantity * selectedCurr.amount;
            });

            return this.setState({ totalPrice: price, items });
        }
    }

    // ----------------------------------------------------------------
    // ********** CUSTOM FUNCTIONS ************* */
    changeQuantity = (id: string, quantity: string | number) => {
        let items = 0;
        let price = 0;
        this.props.cart.forEach((item: any) => {
            const selectedCurr = item.prices.find((price: any) =>
                price.currency.label === this.props.currencyValue
                    ? price.amount
                    : price.currency.amount
            );
            if (quantity !== 'inc') {
                console.log('equal');
            } else {
                console.log('not equal');
            }
            let quan = item.quantity + 1;
            if (quantity === 'dec') {
                quan = item.quantity - 1;
            }
            if (item.id === id) {
                console.log(quantity);
                item.quantity = quan;
                price += item.quantity * selectedCurr.amount;
            }
        });
        return this.setState({ totalPrice: price, items });
    };

    increaseQuantity = (id: string) => {
        let items = 0;
        let price = 0;
        this.props.cart.forEach((item: any) => {
            const selectedCurr = item.prices.find((price: any) =>
                price.currency.label === this.props.currencyValue
                    ? price.amount
                    : price.currency.amount
            );
            if (item.id === id) {
                item.quantity = item.quantity + 1;
                items += item.quantity;
                price += item.quantity * selectedCurr.amount;
            }
        });
        return this.setState({ totalPrice: price, items });
    };

    decreaseQuantity = (id: string) => {
        let items = 0;
        let price = 0;
        this.props.cart.forEach((item: any) => {
            const selectedCurr = item.prices.find((price: any) =>
                price.currency.label === this.props.currencyValue
                    ? price.amount
                    : price.currency.amount
            );
            if (item.id === id) {
                item.quantity = item.quantity - 1;
                items += item.quantity;
                price += item.quantity * selectedCurr.amount;
            }
        });
        if (items === -1 && window.confirm('Are you sure you want to delete this item?')) {
            return this.props.removeFromCart(id);
        }

        return this.setState({ totalPrice: price, items });
    };

    removeItem = (id: string) => {
        if (this.props.cart.length > 0) {
            return;
        }

        this.props.removeFromCart(id);
    };

    goToCartBagClosingCart = () => {
        this.props.router.navigate('/cart');
        this.props.toggleCart(false);
    };

    // ----------------------------------------------------------------
    // ********** RENDER ************* */

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
                        {this.props.cart.map((item: any) => {
                            return (
                                <CartCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    brand={item.brand}
                                    prices={item.prices}
                                    img={item.gallery[0]}
                                    symbol={item.symbol}
                                    quantity={item.quantity}
                                    // total={item.total}
                                    currencyValue={this.props.currencyValue}
                                    removeItem={() => this.removeItem(item.id)}
                                    attributes={item.attributes}
                                    decreaseQuantity={this.decreaseQuantity}
                                    increaseQuantity={this.increaseQuantity}
                                />
                            );
                        })}
                    </Wrapper>
                    <Wrapper class="cart__footer">
                        <Wrapper class="cart__footer--payment">
                            <h3 className="cart__footer--total">Total {this.state.items} items</h3>
                            <h3 className="cart__footer--price">
                                {this.props.currencySymbol}
                                {this.state.totalPrice}
                            </h3>
                        </Wrapper>
                        <Wrapper class="cart__footer--buttons">
                            <button className="btn btn-bag" onClick={this.goToCartBagClosingCart}>
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
// ----------------------------------------------------------------
const mapStateToProps = (state: any) => ({
    currencyValue: state.productData.currencyValue,
    currencySymbol: state.productData.currencySymbol,
    cart: state.productData.cart,
    productsCurrency: state.productData.productsCurrency,
    selectedCurr: state.productData.selectedCurr,
});

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
    removeFromCart: (id: string) => dispatch(actions.productData.removeFromCart(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
