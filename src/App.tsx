import React, { Component } from 'react';
import Layout from './layout/Layout';
import { Route, Routes, Navigate } from 'react-router-dom';
import CategoryPage from './pages/category/CategoryPage';
import ProductPage from './pages/product-description/ProductPage';
import CartPage from './pages/cart/CartPage';

// *********************************
interface AppProps {}
interface AppState {}
class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(
            '%cDeveloped by %cShammlo Ameer%c.',
            ' font-weight: bold; font-size: 20px',
            'color: #FFD700; font-weight: bold; font-size: 23px',
            ' font-weight: bold; font-size: 20px'
        );
        console.log(
            '%cCode source: https://github.com/shammlo/Shamlo-Ameer-sw-web.',
            ' font-weight: bold; font-size: 20px'
        );
        console.log(
            '%cPortfolio: https://shamlo.vercel.app/.',
            ' font-weight: bold; font-size: 20px'
        );
    }
    // ----------------------------------------------------------------
    render() {
        return (
            <Layout>
                <Routes>
                    <Route path="/category/" element={<CategoryPage />} />
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route
                        path="/category/:categoryName/product/:productId"
                        element={<ProductPage />}
                    />
                    <Route path="/cart/bag" element={<CartPage />} />
                    <Route path="/" element={<Navigate replace to="/category/all" />} />
                </Routes>
            </Layout>
        );
    }
}

export default App;
