//********** IMPORTS ************* */
import React, { Component } from 'react';
import Wrapper from '../utils/Hoc/Wrappers/Wrapper';
import { fetchData } from '../store/fetchData';
import { Header } from '../components/header/Header';

//******************************** */

interface LayoutProps {
    children: React.ReactNode;
}

class Layout extends Component {
    constructor(props: LayoutProps) {
        super(props);
        this.state = {
            query: '',
        };
    }
    componentDidMount = () => {
        document.title = 'Home';
        // fetchData()
        //     .then((data: any) => {
        //         console.log(data.data);
        //     })
        //     .catch((error: Error) => {
        //         console.log(error);
        //     });
    };
    render() {
        return (
            <Wrapper class="layout">
                <Header />
                <main className="main">{this.props.children}</main>
            </Wrapper>
        );
    }
}
export default Layout;
