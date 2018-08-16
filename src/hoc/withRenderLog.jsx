import React from 'react';

const withRenderLog = WrapperComponent => props => {
  console.group(`@${WrapperComponent.name}`);
  console.log('re-render');
  console.groupEnd(`@${WrapperComponent.name}`);

  return <WrapperComponent {...props} />;
};

export default withRenderLog;
