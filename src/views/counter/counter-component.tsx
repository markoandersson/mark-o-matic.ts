import { Badge, Button, Col, Row } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from './counter';
import { RootState } from '../../shared/types';

export const CounterComponent = (): React.ReactElement => {
  const dispatch = useDispatch();

  const count = useSelector((state: RootState) => selectors.count(state));

  const onIncrease = useCallback(() => {
    dispatch(actions.increaseCounter());
  }, [dispatch]);

  const onDecrease = useCallback(() => {
    dispatch(actions.decreaseCounter());
  }, [dispatch]);

  const onReset = useCallback(() => {
    dispatch(actions.resetCounter());
  }, [dispatch]);

  return (
    <Row>
      <Col span={2}>
        <Badge count={count} title="counter" showZero />
      </Col>
      <Col span={12}>
        <Button onClick={onIncrease}>Increase</Button>
        <Button onClick={onDecrease}>Decrease</Button>
        <Button type="danger" onClick={onReset}>
          Reset
        </Button>
      </Col>
    </Row>
  );
};
