//********** IMPORTS ************* */
import { Component } from 'react';
import { Card } from '../../components/card/Card';
import Wrapper from '../../utils/Hoc/Wrappers/Wrapper';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions/Actions';

import { ProductType } from '../../store/types';
//******************************** */
interface CategoryPageState {
    inStock: boolean;
}
interface CategoryPageProps {
    products: [ProductType];
    productName: string;
}

class CategoryPage extends Component<CategoryPageProps, CategoryPageState> {
    constructor(props: CategoryPageProps) {
        super(props);
        this.state = {
            inStock: false,
        };
    }
    // ----------------------------------------------------------------
    render() {
        // Deleting later and replacing with api call

        return (
            <Wrapper class="category">
                <Wrapper class="container">
                    <Wrapper class="category__title">
                        <h1 className="category__title--text">{this.props.productName} products</h1>
                    </Wrapper>

                    <Wrapper class="category__cards">
                        {this.props.products?.map((product: ProductType) => {
                            return (
                                <Card
                                    key={product.id}
                                    text={product.name}
                                    price={product.prices[0].amount}
                                    img={product.gallery[0]}
                                    inStock={product.inStock}
                                    id={product.id}
                                />
                            );
                        })}
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        );
    }
}
// ----------------------------------------------------------------
const mapStateToProps = (state: {
    productData: { products: [ProductType]; productName: string };
}) => {
    return {
        products: state.productData.products,
        productName: state.productData.productName,
    };
};
export default connect(mapStateToProps)(CategoryPage);
