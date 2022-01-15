//********** IMPORTS ************* */
import React, { Component } from 'react';
import Wrapper from '../utils/Hoc/Wrappers/Wrapper';
import Header from '../components/header/Header';
import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';
//******************************** */

interface LayoutState {
    cartOpen: boolean;
    category: null;
}
interface LayoutProps {
    children: React.ReactNode;
    fetchProducts: (productId: string, productName: string) => void;
    categoryName: string;
}

class Layout extends Component<LayoutProps, LayoutState> {
    constructor(props: LayoutProps) {
        super(props);
        this.state = {
            cartOpen: false,
            category: null,
        };
    }

    componentDidMount = () => {
        document.title = 'All Categories';
        this.props.fetchProducts('ps-5', this.props.categoryName);
    };

    componentDidUpdate = (prevProps: LayoutProps) => {
        if (this.props.categoryName !== prevProps.categoryName) {
            document.title = this.capitalizer(this.props.categoryName) + ' Products';
            this.props.fetchProducts('ps-5', this.props.categoryName);
        }
    };

    // ----------------------------------------------------------------
    // ********** CUSTOM FUNCTIONS ************* */

    toggleCart = (open: boolean | undefined) => {
        if (open && open !== undefined) {
            return this.setState({ cartOpen: open });
        }
        return this.setState({ cartOpen: !this.state.cartOpen });
    };

    // ----------------------------------------------------------------
    // ********** RENDER ************* */

    //- not required, capitalizing document title since category name is lowercase
    //- https://stackoverflow.com/a/7224605/14648783
    capitalizer = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || '';
    render() {
        return (
            <Wrapper class="app layout">
                <Header toggleCart={this.toggleCart} cartOpen={this.state.cartOpen} />
                <main className={`main ${this.state.cartOpen ? 'cart-open' : ''}`}>
                    {this.props.children}
                    {this.state.cartOpen && (
                        <Wrapper class="backdrop" clicked={() => this.toggleCart(false)}></Wrapper>
                    )}
                </main>
            </Wrapper>
        );
    }
}
// ----------------------------------------------------------------
const mapStateToProps = (state: { productData: { categoryName: string } }) => ({
    categoryName: state.productData.categoryName,
});
const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
    fetchProducts: (productId: string, categoryName: string) =>
        dispatch(actions.productData.fetchProducts(productId, categoryName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
