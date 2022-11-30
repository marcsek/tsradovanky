import { QueryErrorResetBoundary } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorModal from "./ErrorModal";

const TopErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={({ error, resetErrorBoundary }) => <ErrorModal error={error} resetErrorBoundary={resetErrorBoundary} />}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default TopErrorBoundary;
