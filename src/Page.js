import React from 'react';
import './styles/Page.css';

const Page = ({ children, direction }) => {
    return (
        <section className={`${direction} page`}>
            {children}
        </section>
    );
};

export default Page;