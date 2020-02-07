import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from './backend-call';
import { Button } from 'antd';
import { RootState } from '../../shared/types';

export const BackendCallComponent = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => selectors.isLoading(state));
  const response = useSelector((state: RootState) => selectors.getResponse(state));

  const onLoad = useCallback(() => {
    dispatch(actions.fetchDataFromBackend({ request: 'kissa13' }));
  }, [dispatch]);

  return (
    <div>
      <Button onClick={onLoad} loading={loading}>
        Fetch from back-end
      </Button>
      <div>response: {response}</div>
    </div>
  );
};
