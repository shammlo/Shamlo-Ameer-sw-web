import React, { Component } from 'react';
import './App.css';
import { Card } from './components/card/Card';
import Layout from './layout/Layout';
import Wrapper from './utils/Hoc/Wrappers/Wrapper';

// *********************************
type Item = {
    img: string;
    text: string;
    price: string | number;
    inStock: boolean;
};
interface AppProps {}
interface AppState {
    inStock: boolean;
}
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
        const items: Item[] = [
            {
                img: 'assets/images/test-1.jpg',
                text: 'Apollo Running Short',
                price: '100.00',
                inStock: true,
            },
            {
                img: 'assets/images/test-4.jpg',
                text: 'Apollo Running Short',
                price: '100.00',
                inStock: true,
            },
            {
                img: 'assets/images/test-1.jpg',
                text: 'Apollo Running Short',
                price: '100.00',
                inStock: false,
            },
            {
                img: 'assets/images/test-1.jpg',
                text: 'Apollo Running Short',
                price: '100.00',
                inStock: true,
            },
            {
                img: 'assets/images/test-4.jpg',
                text: 'Apollo Running Short',
                price: '100.00',
                inStock: true,
            },
            {
                img: 'assets/images/test-1.jpg',
                text: 'Apollo Running Short',
                price: '100.00',
                inStock: true,
            },
        ];
        return (
            <Layout>
                <Wrapper class="category">
                    <Wrapper class="container">
                        <Wrapper class="category__title">
                            <h1 className="category__title--text">Category name</h1>
                        </Wrapper>

                        <Wrapper class="category__cards">
                            {items.map((item: Item, index: number) => {
                                return (
                                    <Card
                                        key={index}
                                        text={item.text}
                                        price={item.price}
                                        img={item.img}
                                        inStock={item.inStock}
                                    />
                                );
                            })}
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
            </Layout>
        );
    }
}

export default App;
