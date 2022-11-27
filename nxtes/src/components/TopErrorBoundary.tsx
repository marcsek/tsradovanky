import { QueryErrorResetBoundary } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

const TopErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={({ error, resetErrorBoundary }) => {
            return (
              <div onClick={resetErrorBoundary}>
                <p>Error</p>
                <span>{error.message}</span>
              </div>
            );
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default TopErrorBoundary;
