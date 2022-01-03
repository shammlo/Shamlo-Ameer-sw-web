import React, { Component } from 'react';
import './App.css';
import Layout from './layout/Layout';
import Wrapper from './utils/Hoc/Wrappers/Wrapper';

// *********************************

class App extends Component {
    // ----------------------------------------------------------------
    render() {
        return (
            <Layout>
                <Wrapper>Main</Wrapper>
            </Layout>
        );
    }
}

export default App;
