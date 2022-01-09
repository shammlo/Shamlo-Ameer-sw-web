import React, { Component } from 'react';
import Layout from './layout/Layout';
import { Route, Routes } from 'react-router-dom';
import CategoryPage from './pages/category/CategoryPage';
import ProductPage from './pages/product-description/ProductPage';
import CartPage from './pages/cart/CartPage';

// *********************************
interface AppProps {}
interface AppState {}
class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            inStock: false,
        };
    }
    // ----------------------------------------------------------------
    render() {
        // Deleting later and replacing with api call

        return (
            <Layout>
                <Routes>
                    <Route path="/" element={<CategoryPage />} />
                    <Route path="/product/:productId" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </Layout>
        );
    }
}

export default App;
