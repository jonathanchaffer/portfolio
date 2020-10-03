import { useCallback, useState } from "react";

export const useErrorHandling = (): {
  error: Error | undefined;
  handleError: (err: Error) => void;
} => {
  const [error, setError] = useState<Error | undefined>(undefined);

  const handleError = useCallback((err: Error): void => setError(err), []);

  return { error, handleError };
};
