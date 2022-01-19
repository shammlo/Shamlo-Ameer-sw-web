//********** IMPORTS ************* */
import { Component } from 'react';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import CartCard from './cart-card/CartCard';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/Actions';
import { withRouter } from '../../utils/Hoc/withParams';
import { numberWithCommas } from '../../utils/helper-functions/helperFunctions';
import { Button } from '../ui/Button';
import { Modal } from '../ui/modal/Modal';

//******************************** */

interface CartProps {
    open: boolean;
    cart: object[];
    currencyValue: string;
    removeFromCart: (id: string) => void;
    router: any;
    toggleCart: (open: boolean | undefined) => void;
    currencySymbol: string;
    selectedCurr: any;
    notificationCounter: (number: number) => void;
    totalPrice: number;
    totalPriceHandler: () => void;
    increaseItemQuantity: (id: string) => void;
    decreaseItemQuantity: (id: string) => void;
    cartItems: number;
    selectedAttrs: {
        [key: string]: {
            [key: string]: string;
        };
    };
}
interface CartState {
    totalPrice: number;
    items: number;
    modalOpen: boolean;
}
class Cart extends Component<CartProps, CartState> {
    constructor(props: CartProps) {
        super(props);
        this.state = {
            totalPrice: 0,
            items: 0,
            modalOpen: false,
        };
    }

    componentDidUpdate(prevProps: CartProps) {
        if (
            (prevProps.cart !== this.props.cart &&
                (this.props.totalPrice || this.props.currencyValue)) ||
            prevProps.currencyValue !== this.props.currencyValue
        ) {
            this.props.totalPriceHandler();
        }
    }

    // ----------------------------------------------------------------
    // ********** CUSTOM FUNCTIONS ************* */

    // - to insure that the item is deleted or decremented from the cart based on conditions
    decreaseQuantity = (id: string, quantity: number) => {
        if (quantity === 1) {
            return (
                window.confirm('Do you want to remove this item from cart?') === true &&
                this.props.removeFromCart(id)
            );
        }
        if (quantity === 0) {
            return;
        }
        return this.props.decreaseItemQuantity(id);
    };

    // - Remove item when quantity is 0
    removeItem = (id: string) => {
        if (this.props.cart.length > 0) {
            return;
        }
        return this.props.removeFromCart(id);
    };

    // - Custom function ensures the cart is closed when the user clicks on the cart bag
    goToCartBagClosingCart = () => {
        this.props.router.navigate('/cart/bag');
        this.props.toggleCart(false);
    };

    modalHandler = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
        this.props.toggleCart(false);
    };
    // ----------------------------------------------------------------
    // ********** RENDER ************* */

    render() {
        return (
            <>
                <Wrapper class={`cart ${this.props.open && 'opened'}`}>
                    <Wrapper class="cart__wrapper">
                        <Wrapper class="cart__header">
                            <h2 className="cart__header--title">
                                My Bag,{' '}
                                <span className="cart__header--subtitle">
                                    {this.props.cartItems} items
                                </span>
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
                                        // symbol={item.symbol}
                                        quantity={item.quantity}
                                        totalPrice={item.total}
                                        currencyValue={this.props.currencyValue}
                                        selectedAttrs={item.selectedAttrs}
                                        decreaseQuantity={() =>
                                            this.decreaseQuantity(item.id, item.quantity)
                                        }
                                        increaseQuantity={() =>
                                            this.props.increaseItemQuantity(item.id)
                                        }
                                    />
                                );
                            })}
                        </Wrapper>
                        <Wrapper class="cart__footer">
                            <Wrapper class="cart__footer--payment">
                                <h3 className="cart__footer--total">
                                    Total {this.props.cartItems} items
                                </h3>
                                <h3 className="cart__footer--price">
                                    {this.props.currencySymbol}
                                    {numberWithCommas(this.props.totalPrice)}
                                </h3>
                            </Wrapper>
                            <Wrapper class="cart__footer--buttons">
                                <Button
                                    className="btn btn-bag"
                                    clicked={this.goToCartBagClosingCart}
                                >
                                    <p>view bag</p>
                                </Button>
                                <Button
                                    className="btn btn-checkout"
                                    value="checkout"
                                    clicked={this.modalHandler}
                                >
                                    <p>Checkout</p>
                                </Button>
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>

                <Modal open={this.state.modalOpen} modalHandler={this.modalHandler}>
                    {this.state.modalOpen && (
                        <Wrapper class="modal-info">
                            <h2>Total Items:</h2>
                            <span>{this.props.cartItems}</span>
                            <h2 style={{ paddingTop: '10px' }}>Total Price:</h2>
                            <span>
                                {this.props.currencySymbol}
                                {numberWithCommas(this.props.totalPrice)}
                            </span>
                        </Wrapper>
                    )}
                </Modal>
            </>
        );
    }
}
// ----------------------------------------------------------------
const mapStateToProps = (state: any) => ({
    currencyValue: state.productData.currencyValue,
    currencySymbol: state.productData.currencySymbol,
    cart: state.productData.cart,
    selectedCurr: state.productData.selectedCurr,
    totalPrice: state.productData.totalPrice,
    cartItems: state.productData.cartItems,
    selectedAttrs: state.productData.selectedAttrs,
});

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
    removeFromCart: (id: string) => dispatch(actions.productData.removeFromCart(id)),

    totalPriceHandler: () => dispatch(actions.productData.totalPriceAndCartItemCount()),
    increaseItemQuantity: (id: string) => dispatch(actions.productData.increaseItemQuantity(id)),
    decreaseItemQuantity: (id: string) => dispatch(actions.productData.decreaseItemQuantity(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
