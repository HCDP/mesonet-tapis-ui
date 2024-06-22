import React from 'react';
import { LoadingSpinner, Message } from 'tapis-ui/_common';

type QueryWrapperProps = React.PropsWithChildren<{
  isLoading: boolean;
  error: Error | null;
  altMessage?: string;
  className?: string;
}>;

const QueryWrapper: React.FC<QueryWrapperProps> = ({
  isLoading,
  error,
  altMessage,
  children,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={className}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Message canDismiss={false} type="error" scope="inline">
          {altMessage ?? (error as any).message ?? error}
        </Message>
      </div>
    );
  }
  return <div className={className}>{children}</div>;
};

export default QueryWrapper;
