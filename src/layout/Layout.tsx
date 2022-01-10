//********** IMPORTS ************* */
import React, { Component } from 'react';
import Wrapper from '../utils/Hoc/Wrappers/Wrapper';
// import { fetchData } from '../store/fetchData';
import Header from '../components/header/Header';
import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';
//******************************** */

interface LayoutState {
    cartOpen: boolean;
}
interface LayoutProps {
    children: React.ReactNode;
    fetchProducts: () => void;
}

class Layout extends Component<LayoutProps, LayoutState> {
    constructor(props: LayoutProps) {
        super(props);
        this.state = {
            cartOpen: false,
        };
    }

    componentDidMount = () => {
        document.title = 'Home';
        this.props.fetchProducts();
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
const mapStateToProps = (state: {
    productData: { currency: [{ symbol: string; label: string }] };
}) => ({});
const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
    fetchProducts: () => dispatch(actions.productData.fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
