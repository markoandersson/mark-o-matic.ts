import { Menu } from 'antd';
import { HomeOutlined, NumberOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { HomePage } from './views/home/';
import { CounterPage } from './views/counter';
import { BackendCallPage } from './views/backend-call';

export const Navigation = () => {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1">
        <HomeOutlined />
        <span>Home</span>
        <Link to="/" />
      </Menu.Item>
      <Menu.Item key="2">
        <NumberOutlined />
        <span>Counter</span>
        <Link to="/counter" />
      </Menu.Item>
      <Menu.Item key="3">
        <CloudDownloadOutlined />
        <span>API-call</span>
        <Link to="/api-call" />
      </Menu.Item>
    </Menu>
  );
};

export const Routes = () => {
  return (
    <Switch>
      <Route path="/counter">
        <CounterPage />
      </Route>
      <Route path="/api-call">
        <BackendCallPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
};
