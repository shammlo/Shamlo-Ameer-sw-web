//********** IMPORTS ************* */
import React, { Component } from 'react';
import { withRouter } from '../../utils/Hoc/withParams';
import { connect } from 'react-redux';
import { ProductType, Attributes, Attribute, Price } from '../../store/types';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import * as actions from '../../store/actions/Actions';
import { numberWithCommas } from '../../utils/helper-functions/helperFunctions';
import { Modal } from '../../components/ui/modal/Modal';
//******************************** */

interface ProductPageProps {
    img?: string;
    description: string;
    products?: [ProductType];
    router?: any;
    currencyValue?: string;
    addToCart?: ((id: string, attributes: string[]) => void) | any;
}
interface ProductPageState {
    selectedImg: string;
    selectedAttrs: [];
    radioChecked: boolean;
    hasAttrs: boolean;
    modalOpen: boolean;
}
class ProductPage extends Component<ProductPageProps, ProductPageState> {
    constructor(props: ProductPageProps) {
        super(props);
        this.state = {
            selectedImg: '',
            selectedAttrs: [],
            radioChecked: false,
            hasAttrs: true,
            modalOpen: false,
        };
    }

    componentDidMount() {
        document.title = this.props.router.params.productId;
    }

    // ----------------------------------------------------------------
    // ********** CUSTOM FUNCTIONS ************* */

    toggleProductImg = (img: string, index: number) => {
        this.setState({
            selectedImg: img,
        });
    };

    checkingAttributes = (item: Attribute) => {
        this.setState((prevState: ProductPageState) => {
            return {
                selectedAttrs: {
                    ...prevState.selectedAttrs,
                    [item.id]: item,
                },
            };
        });
    };

    addToCart = () => {
        const selectedProduct = this.props.products?.find(
            (product: ProductType) => product.id === this.props.router.params.productId
        );
        if (!this.state.radioChecked && selectedProduct?.attributes.length) {
            // return alert('Please select an attribute');
            return this.setState({ modalOpen: true });
        }
        return this.props.addToCart(this.props.router.params.productId, this.state.selectedAttrs);
    };

    popupToggle = () => {
        this.setState((prevState: ProductPageState) => {
            return {
                modalOpen: !prevState.modalOpen,
            };
        });
    };
    // --------------------------------------------------------
    // ********** RENDER ************* */
    render() {
        const selectedProduct = this.props.products?.find(
            (product: ProductType) => product.id === this.props.router.params.productId
        );
        const selectedCurrency = selectedProduct?.prices.find(
            (prices: Price) => prices.currency.label === this.props.currencyValue
        );
        const attributes = selectedProduct?.attributes.length ? true : false;

        // - Best solution i found without using third party library
        // - <div using dangerouslySetInnerHTML={{__html: description}} />
        // - https://pretagteam.com/question/parse-html-string-in-react
        const description = selectedProduct?.description as string;
        return (
            <Wrapper class="product">
                <Wrapper class="container">
                    <Wrapper class="product__wrapper">
                        <Wrapper class="product__left">
                            <Wrapper class="product__gallery">
                                {selectedProduct?.gallery.map((product: string, index: number) => {
                                    return (
                                        <img
                                            key={index}
                                            src={product}
                                            alt="product"
                                            onClick={() => this.toggleProductImg(product, index)}
                                        />
                                    );
                                })}
                            </Wrapper>
                        </Wrapper>
                        <Wrapper class="product__middle">
                            <img
                                src={
                                    this.state.selectedImg
                                        ? this.state.selectedImg
                                        : selectedProduct?.gallery[0]
                                }
                                alt="Product"
                                width="60"
                                height="60"
                            />
                        </Wrapper>
                        <Wrapper class="product__right">
                            <Wrapper class="product__info">
                                <Wrapper class="product__info--header">
                                    <h2>{selectedProduct?.brand}</h2>
                                    <h3>{selectedProduct?.name}</h3>
                                </Wrapper>
                                <Wrapper class="product__info--sizes">
                                    {selectedProduct?.attributes?.map((items: Attributes) => {
                                        return (
                                            <Wrapper class="attribute" key={items.id}>
                                                <h2>{items.name}</h2>
                                                <Wrapper style={{ display: 'flex' }} key={items.id}>
                                                    {items.items.map(
                                                        (item: Attribute, index: number) => {
                                                            const attrDuplicate =
                                                                item.id === 'Yes' ||
                                                                item.id === 'No'
                                                                    ? true
                                                                    : false;
                                                            return (
                                                                <Wrapper
                                                                    class="radio"
                                                                    key={item.id}
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name={items.name}
                                                                        className="radio-btn"
                                                                        value={item.id}
                                                                        id={
                                                                            !attrDuplicate
                                                                                ? item.id
                                                                                : item.id +
                                                                                  items.name
                                                                        }
                                                                        onChange={() =>
                                                                            this.checkingAttributes(
                                                                                item
                                                                            )
                                                                        }
                                                                        onClick={() =>
                                                                            this.setState({
                                                                                radioChecked: true,
                                                                            })
                                                                        }
                                                                    />
                                                                    <label
                                                                        className={`radio-label ${
                                                                            item.value.includes('#')
                                                                                ? 'colored'
                                                                                : 'sized'
                                                                        }`}
                                                                        htmlFor={
                                                                            !attrDuplicate
                                                                                ? item.id
                                                                                : item.id +
                                                                                  items.name
                                                                        }
                                                                        style={{
                                                                            backgroundColor:
                                                                                item.value,
                                                                        }}
                                                                    >
                                                                        <span>
                                                                            {item.value.includes(
                                                                                '#'
                                                                            )
                                                                                ? ''
                                                                                : item.value}
                                                                        </span>
                                                                    </label>
                                                                </Wrapper>
                                                            );
                                                        }
                                                    )}
                                                </Wrapper>
                                            </Wrapper>
                                        );
                                    })}

                                    {attributes
                                        ? !this.state.radioChecked && (
                                              <Wrapper class="attr-warning">
                                                  <h2>Please select an attribute!</h2>
                                              </Wrapper>
                                          )
                                        : null}
                                </Wrapper>

                                <Wrapper class="product__info--price">
                                    <h2>Price:</h2>
                                    <span>
                                        {selectedCurrency?.currency.symbol}
                                        {numberWithCommas(selectedCurrency?.amount)}
                                    </span>
                                </Wrapper>
                                <Wrapper class="product__info--toCart">
                                    <button className="btn btn-checkout" onClick={this.addToCart}>
                                        <span>Add to cart</span>
                                    </button>
                                </Wrapper>
                                {/* <Wrapper class="product__info--description">
                                    {selectedProduct?.description}
                                </Wrapper> */}
                                <div
                                    className="product__info--description"
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </Wrapper>
                        </Wrapper>

                        <Modal open={this.state.modalOpen} modalHandler={this.popupToggle} main>
                            {this.state.modalOpen && (
                                <Wrapper class="modal-info">
                                    <h2>Please select an attribute!</h2>
                                </Wrapper>
                            )}
                        </Modal>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        );
    }
}
//---------------------------------------------------

const mapStateToProps = (state: {
    productData: {
        products: [ProductType];
        productName: string;
        currencyValue: string;
    };
}) => {
    return {
        products: state.productData.products,
        currencyValue: state.productData.currencyValue,
    };
};

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
    addToCart: (id: string, attributes: string[]) =>
        dispatch(actions.productData.addToCart(id, attributes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage));
