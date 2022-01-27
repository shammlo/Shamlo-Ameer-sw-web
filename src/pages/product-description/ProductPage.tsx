//********** IMPORTS ************* */
import React, { Component } from 'react';
import { withRouter } from '../../utils/Hoc/withParams';
import { connect } from 'react-redux';
import { ProductType, Attributes, Attribute, Price } from '../../store/types';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import * as actions from '../../store/actions/Actions';
import { numberWithCommas } from '../../utils/helper-functions/helperFunctions';
import { Modal } from '../../components/ui/modal/Modal';
import parse from 'html-react-parser';

//******************************** */

interface ProductPageProps {
    img?: string;
    description: string;
    products?: [ProductType];
    router?: any;
    currencyValue?: string;
    addToCart?: ((id: string, attributes: string[]) => void) | any;
    selectedAttrs: {
        [key: string]: {
            [key: string]: string;
        };
    };
    cart: any;
    redirect: boolean;
}
interface ProductPageState {
    selectedImg: string;
    selectedAttrs: any;
    radioChecked: boolean;
    hasAttrs: boolean;
    modalOpen: boolean;
    selected: any;
    checkedState?: any;
    attrSelected: any;
    allAttrWarn: boolean;
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
            selected: [],
            checkedState: [],
            attrSelected: [],

            allAttrWarn: false,
        };
    }

    componentDidMount() {
        document.title = this.props.router.params.productId;
        const selectedProduct = this.props.products?.find(
            (product: ProductType) => product.id === this.props.router.params.productId
        );
        if (this.props.redirect || selectedProduct?.inStock === false) {
            this.setState({
                modalOpen: true,
            });
        }
    }

    // ----------------------------------------------------------------
    // ********** CUSTOM FUNCTIONS ************* */

    // - Selected image handler
    toggleProductImg = (img: string, index: number) => {
        this.setState({
            selectedImg: img,
        });
    };

    // - Selected attributes handler
    toggleProductAttr = (items: any) => {
        this.setState({
            radioChecked: true,
            selected: items,
        });
    };

    // ---------------------------------
    // - Selected attribute handler
    checkingAttributes = (
        selectedItem: Attribute,
        items: any,
        parIndex: number,
        chiIndex: number
    ) => {
        items.map((item: any, index: number) => {
            return item.items.map((item2: any, index2: number) => {
                return item2.id === selectedItem.id && parIndex === index
                    ? this.setState((prevState: ProductPageState) => {
                          return {
                              attrSelected:
                                  this.state.attrSelected.length <= parIndex
                                      ? [
                                            ...prevState.attrSelected,
                                            {
                                                [index]: true,
                                            },
                                        ]
                                      : [...prevState.attrSelected],
                          };
                      })
                    : null;
            });
        });

        this.setState((prevState: ProductPageState) => {
            return {
                selectedAttrs: {
                    ...prevState.selectedAttrs,
                    [parIndex]: selectedItem,
                },
            };
        });
    };

    // ---------------------------------
    // - Add to cart function
    addToCart = () => {
        //- trying to get the last item,
        // const lastCheckedAttribute = Object.values(this.state.selectedAttrs)[
        //     Object.values(this.state.selectedAttrs).length - 1
        // ];

        const selectedProduct = this.props.products?.find(
            (product: ProductType) => product.id === this.props.router.params.productId
        );
        if (!this.state.radioChecked && selectedProduct?.attributes.length) {
            // return alert('Please select an attribute');
            return this.setState({ modalOpen: true });
        }
        if (!selectedProduct?.inStock) {
            this.setState({
                modalOpen: true,
            });
            return;
        }

        //- if All attributes are checked or not

        if (
            Object.keys(this.state.selectedAttrs).length < this.state.selected.length &&
            this.state.selected.length !== this.state.attrSelected.length
        ) {
            this.setState({
                modalOpen: true,
                allAttrWarn: true,
            });
            return;
        }

        return this.props.addToCart(this.props.router.params.productId, this.state.selectedAttrs);
    };

    // ---------------------------------
    // - Modal handler
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
                                <Wrapper class="product__info--header mb-10">
                                    <h2>{selectedProduct?.brand}</h2>
                                    <h3>{selectedProduct?.name}</h3>
                                </Wrapper>
                                <Wrapper class="product__info--sizes">
                                    {selectedProduct?.attributes?.map(
                                        (items: Attributes, parIndex: number) => {
                                            return (
                                                <Wrapper class="attribute" key={items.id}>
                                                    <h2>{items.name}</h2>
                                                    <Wrapper class="flex" key={items.id}>
                                                        {items.items.map(
                                                            (item: Attribute, index: number) => {
                                                                //- This fixed the issue of the attribute which having the same value
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
                                                                                    item,
                                                                                    selectedProduct.attributes,
                                                                                    parIndex,
                                                                                    index
                                                                                )
                                                                            }
                                                                        />
                                                                        <label
                                                                            className={`radio-label ${
                                                                                items.type ===
                                                                                'swatch'
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
                                                                            onClick={() =>
                                                                                this.toggleProductAttr(
                                                                                    selectedProduct.attributes
                                                                                )
                                                                            }
                                                                        >
                                                                            <span>
                                                                                {items.type ===
                                                                                'swatch'
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
                                        }
                                    )}

                                    {attributes
                                        ? !this.state.radioChecked && (
                                              <Wrapper class="attr-warning">
                                                  <h2>Please select an option!</h2>
                                              </Wrapper>
                                          )
                                        : null}
                                </Wrapper>

                                <Wrapper class="product__info--price mt-10">
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
                                <Wrapper class="product__info--description">
                                    {description && parse(description)}
                                </Wrapper>
                            </Wrapper>
                        </Wrapper>

                        <Modal open={this.state.modalOpen} modalHandler={this.popupToggle} main>
                            {(this.state.modalOpen || this.props.redirect) && (
                                <Wrapper class="modal-info">
                                    {this.state.allAttrWarn ? (
                                        <h2>Please select All options to buy this item!</h2>
                                    ) : !selectedProduct?.inStock ? (
                                        <h2>This product is out of stock.</h2>
                                    ) : (
                                        <h2>Please select an option to buy this item!</h2>
                                    )}
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
        selectedAttrs: {
            [key: string]: {
                [key: string]: string;
            };
        };
        cart: any;
        redirect: boolean;
    };
}) => {
    return {
        cart: state.productData.cart,
        products: state.productData.products,
        currencyValue: state.productData.currencyValue,
        selectedAttrs: state.productData.selectedAttrs,
        redirect: state.productData.redirect,
    };
};

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
    addToCart: (id: string, attributes: string[]) =>
        dispatch(actions.productData.addToCart(id, attributes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage));
