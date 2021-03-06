//********** IMPORTS ************* */
import { Component } from 'react';
import { connect } from 'react-redux';
import CartCard from '../../components/cart/cart-card/CartCard';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import * as actions from '../../store/actions/Actions';
import { numberWithCommas } from '../../utils/helper-functions/helperFunctions';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/modal/Modal';
//******************************** */

interface CartPageProps {
    cart: object[];
    removeFromCart: (id: string) => void;
    currencyValue: string;
    totalPrice: number;
    increaseItemQuantity: (id: string, index: number) => void;
    decreaseItemQuantity: (id: string, index: number) => void;
    currencySymbol: string;
    selectedAttrs: {
        [key: string]: {
            [key: string]: string;
        };
    };
    cartItems: number;
}
interface CartPageState {
    totalPrice: number;
    items: number;
    modalOpen: boolean;
}
class CartPage extends Component<CartPageProps, CartPageState> {
    constructor(props: CartPageProps) {
        super(props);
        this.state = {
            totalPrice: 0,
            items: 0,
            modalOpen: false,
        };
    }

    componentDidMount() {
        document.title = 'Cart Bag';
    }
    // ----------------------------------------------------------------
    // ********** CUSTOM FUNCTIONS ************* */

    // - Decrease quantity of cart items by 1, and remove it from cart when quantity is reached 0
    decreaseQuantity = (id: string, quantity: number, index: number) => {
        if (quantity === 1) {
            return (
                window.confirm('Do you want to remove this item from cart?') === true &&
                this.props.removeFromCart(id)
            );
        }
        if (quantity === 0) {
            return;
        }
        return this.props.decreaseItemQuantity(id, index);
    };

    // ----------------------------------------------------------------
    // ********** RENDER ************* */
    render() {
        return (
            <Wrapper class="cartPage">
                <Wrapper class="container">
                    <Wrapper class="cartPage__title">
                        <h2>Cart Bag</h2>
                    </Wrapper>

                    {this.props.cart.length ? (
                        this.props.cart.map((item: any, index: number) => {
                            return (
                                <CartCard
                                    id={item.id + index}
                                    key={item.id}
                                    name={item.name}
                                    brand={item.brand}
                                    prices={item.prices}
                                    gallery={item.gallery}
                                    quantity={item.quantity}
                                    totalPrice={item.total}
                                    currencyValue={this.props.currencyValue}
                                    selectedAttrs={item.selectedAttrs}
                                    increaseQuantity={() =>
                                        this.props.increaseItemQuantity(item.id, index)
                                    }
                                    decreaseQuantity={() =>
                                        this.decreaseQuantity(item.id, item.quantity, index)
                                    }
                                    carousel
                                />
                            );
                        })
                    ) : (
                        <Wrapper class="cartPage__warning">
                            <h2>No Items in the cart!</h2>
                        </Wrapper>
                    )}

                    <Wrapper class="cartPage__checkout">
                        <Wrapper class="cartPage__checkout--info">
                            <Wrapper class="flex ai-center mr-10">
                                <h2>Items in cart:</h2>
                                <span>{this.props.cartItems},</span>
                            </Wrapper>
                            <Wrapper class="flex ai-center">
                                <h2>Total Price:</h2>
                                <span>
                                    {this.props.currencySymbol}
                                    {numberWithCommas(this.props.totalPrice)}
                                </span>
                            </Wrapper>
                        </Wrapper>
                        <Wrapper class="cartPage__checkout--button">
                            <Button
                                className="btn btn-checkout"
                                value="checkout"
                                clicked={() => this.setState({ modalOpen: true })}
                            >
                                <p>Checkout</p>
                            </Button>
                        </Wrapper>
                    </Wrapper>

                    <Modal
                        open={this.state.modalOpen}
                        modalHandler={() => this.setState({ modalOpen: false })}
                    >
                        {this.state.modalOpen && (
                            <Wrapper class="modal-info">
                                <h2>Total Items:</h2>
                                <span>{this.props.cartItems}</span>
                                <h2 className="pt-10">Total Price:</h2>
                                <span>
                                    {this.props.currencySymbol}
                                    {numberWithCommas(this.props.totalPrice)}
                                </span>
                            </Wrapper>
                        )}
                    </Modal>
                </Wrapper>
            </Wrapper>
        );
    }
}

// ---------------------------------
const mapStateToProps = (state: any) => ({
    cart: state.productData.cart,
    currencyValue: state.productData.currencyValue,
    totalPrice: state.productData.totalPrice,
    currencySymbol: state.productData.currencySymbol,
    selectedAttrs: state.productData.selectedAttrs,
    cartItems: state.productData.cartItems,
});
const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
    removeFromCart: (id: string) => dispatch(actions.productData.removeFromCart(id)),
    increaseItemQuantity: (id: string, index: number) =>
        dispatch(actions.productData.increaseItemQuantity(id, index)),
    decreaseItemQuantity: (id: string, index: number) =>
        dispatch(actions.productData.decreaseItemQuantity(id, index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
