import React from 'react';
import { SharedComponent } from '../../shared/shared-component';
import { Col, Row } from 'antd';
export const HomePage = () => {
  return (
    <Row>
      <Col span={24}>Homepage</Col>
      <Col span={24}>
        <SharedComponent />
      </Col>
    </Row>
  );
};
