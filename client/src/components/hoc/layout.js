import React from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';

const Layout = (props) => {
    return (
        <div>
            <Header />
            <div>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;