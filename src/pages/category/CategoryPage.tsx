//********** IMPORTS ************* */
import React, { Component } from 'react';
import Card from '../../components/card/Card';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import { connect } from 'react-redux';
import { ProductType, Price } from '../../store/types';
import * as actions from '../../store/actions/Actions';
import { withRouter } from '../../utils/Hoc/withParams';
//******************************** */
interface CategoryPageState {
    inStock: boolean;
    category: string | null;
    currentPage: number;
    productsPerPage: number;
    categoryName: string;
}

interface CategoryPageProps {
    products: [ProductType];
    productName: string;
    currencyValue: string;
    categories: [
        {
            [key: string]: {
                name: string;
            };
        }
    ];
    router: any;
    categoryChanged: (category: string) => void;
}

class CategoryPage extends Component<CategoryPageProps, CategoryPageState> {
    constructor(props: CategoryPageProps) {
        super(props);
        this.state = {
            inStock: false,
            category: null,
            currentPage: 1,
            productsPerPage: 6,
            categoryName: '',
        };
    }

    componentDidUpdate(prevProps: CategoryPageProps) {
        if (
            this.state.category !== this.props.router.params.categoryName ||
            prevProps.router.params.categoryName !== this.props.router.params.categoryName
        ) {
            this.setState({
                category: this.props.router.params.categoryName,
            });

            this.props.categoryChanged(this.props.router.params.categoryName);
        }
    }
    // ----------------------------------------------------------------
    // Removed
    // changePagination = <T extends number>(id: T) => {
    //     this.setState({
    //         currentPage: id,
    //     });
    // };

    // ----------------------------------------------------------------
    // **** RENDER ****
    render() {
        // - https://codepen.io/PiotrBerebecki/pen/pEYPbY?editors=0110
        // const { currentPage, productsPerPage } = this.state;
        // const indexOfLastProduct = currentPage * productsPerPage;
        // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        // const currentProducts = this.props.products.slice(indexOfFirstProduct, indexOfLastProduct);
        // const pageNumbers = [];
        // for (let i = 1; i <= Math.ceil(this.props.products.length / productsPerPage); i++) {
        //     pageNumbers.push(i);
        // }

        // const renderPageNumbers = pageNumbers.map((number: number) => {
        //     let active = number === this.state.currentPage ? 'active' : '';

        //     return (
        //         <li
        //             key={number}
        //             className={`category__pagination--item ${active}`}
        //             id={`${number}`}
        //             onClick={() => this.changePagination(number)}
        //         >
        //             <span>{number}</span>
        //         </li>
        //     );
        // });

        // ----------------------------------------------------------------

        return (
            <Wrapper class="category">
                <Wrapper class="container">
                    <Wrapper class="category__title">
                        <h2 className="category__title--text">{this.props.productName} products</h2>
                    </Wrapper>

                    <Wrapper class="category__cards">
                        {this.props.products?.map((product: ProductType) => {
                            const selectedCurrency = product.prices.find((price: Price) => {
                                return price.currency.label === this.props.currencyValue
                                    ? price.amount
                                    : 0;
                            });
                            return (
                                <Card
                                    key={product.id}
                                    text={product.name}
                                    price={selectedCurrency?.amount}
                                    img={product.gallery[0]}
                                    inStock={product.inStock}
                                    id={product.id}
                                    symbol={selectedCurrency?.currency.symbol}
                                    attributes={product.attributes}
                                    router={this.props.router}
                                />
                            );
                        })}
                    </Wrapper>
                    {/* <Wrapper class="category__pagination">
                        <ul className="category__pagination--list">{renderPageNumbers}</ul>
                    </Wrapper> */}
                </Wrapper>
            </Wrapper>
        );
    }
}
// ----------------------------------------------------------------
const mapStateToProps = (state: {
    productData: {
        products: [ProductType];
        productName: string;
        currencyValue: string;
        selectedCategory: string;
        categories: [
            {
                [key: string]: {
                    name: string;
                };
            }
        ];
    };
}) => {
    return {
        products: state.productData.products,
        productName: state.productData.productName,
        currencyValue: state.productData.currencyValue,
        selectedCategory: state.productData.selectedCategory,
        categories: state.productData.categories,
    };
};

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
    categoryChanged: (category: string) => dispatch(actions.productData.categoryChange(category)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryPage));

// - my product card without pagination

// {
//     /* <Wrapper class="category__cards">
//                     {this.props.products ? (
//                         this.props.products?.map((product: ProductType) => {
//                             const selectedCurrency = product.prices.find((price: any) =>
//                                 price.currency.label === this.props.currencyValue
//                                     ? price.amount
//                                     : price.currency.amount
//                             );
//                             return (
//                                 <Card
//                                     key={product.id}
//                                     text={product.name}
//                                     price={selectedCurrency?.amount}
//                                     img={product.gallery[0]}
//                                     inStock={product.inStock}
//                                     id={product.id}
//                                     symbol={selectedCurrency?.currency.symbol}
//                                 />
//                             );
//                         })
//                     ) : (
//                         <Loader />
//                     )}
//                 </Wrapper> */
// }
