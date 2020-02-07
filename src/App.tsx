import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Navigation, Routes } from './navigation';

const Title = styled.div`
  font-size: 3rem;
  padding-left: 5rem;
`;

const App = () => {
    const { Header, Sider, Content } = Layout;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div className="logo" />
                <Navigation />
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Title>Mark-o-matic.ts</Title>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Routes />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;