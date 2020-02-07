import { createAction, PrepareAction } from '@reduxjs/toolkit';

export const createPrefixedActionCreator = <P>(prefix: string) => {
  return <P>(name: string, prepare?: PrepareAction<P>) => {
    const type = prefix + name;
    return prepare ? createAction(type, prepare) : createAction(type);
  };
};
