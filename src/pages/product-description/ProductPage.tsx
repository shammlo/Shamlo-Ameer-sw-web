//********** IMPORTS ************* */
import { Component } from 'react';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import { withRouter } from '../../utils/Hoc/withParams';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions/Actions';
import { ProductType } from '../../store/types';
import { Button } from '../../components/ui/Button';
//******************************** */

interface ProductPageProps {
    img?: string;
    description?: string;
    products?: [ProductType];
    router?: any;
}
interface ProductPageState {
    selectedImg: string;
}
class ProductPage extends Component<ProductPageProps, ProductPageState> {
    constructor(props: ProductPageProps) {
        super(props);
        this.state = {
            selectedImg: '',
        };
    }

    toggleProductImg = (img: string, index: number) => {
        this.setState({
            selectedImg: img,
        });
    };

    render() {
        const selectedProduct = this.props.products?.find(
            (product: ProductType) => product.id === this.props.router.params.productId
        );
        console.log(selectedProduct);

        // - Best solution i found without using third party library
        // - <div using dangerouslySetInnerHTML={{__html: description}} />
        // - https://pretagteam.com/question/parse-html-string-in-react
        const description: any = selectedProduct?.description;
        return (
            <Wrapper class="product">
                <Wrapper class="container">
                    <Wrapper class="product__wrapper">
                        <Wrapper class="product__left">
                            <Wrapper class="product__gallery">
                                {selectedProduct?.gallery.map((product: any, index: number) => {
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
                                    <h2>Apolo</h2>
                                    <h3>Stunning Short</h3>
                                </Wrapper>
                                <Wrapper class="product__info--size">
                                    <h2>Size:</h2>
                                    <Wrapper style={{ display: 'flex' }}>
                                        {selectedProduct?.attributes[0]?.items.map((item: any) => {
                                            return (
                                                <Button key={item.id} className="btn-size">
                                                    <span>{item.value}</span>
                                                </Button>
                                            );
                                        })}
                                    </Wrapper>
                                </Wrapper>
                                <Wrapper class="product__info--price">
                                    <h2>Price:</h2>
                                    <span>$50.00</span>
                                </Wrapper>
                                <Wrapper class="product__info--toCart">
                                    <button className="btn btn-checkout">Add to cart</button>
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
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        );
    }
}
//---------------------------------------------------

const mapStateToProps = (state: {
    productData: { products: [ProductType]; productName: string };
}) => {
    return {
        products: state.productData.products,
    };
};

export default connect(mapStateToProps)(withRouter(ProductPage));
