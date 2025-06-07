import { useState } from "react";

interface ApiState<T> {
  data: T | null;
  error: any | null;
  isLoading: boolean;
}

type MutateOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
};

export const useApiMutation = <T, P>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const mutate = async (endpoint: string, payload: P, options?: MutateOptions<T>) => {
    setState({ data: null, error: null, isLoading: true });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw responseData;
      }

      setState({ data: responseData, error: null, isLoading: false });
      if (options?.onSuccess) {
        options.onSuccess(responseData);
      }
    } catch (err: any) {
      setState({ data: null, error: err, isLoading: false });
      if (options?.onError) {
        options.onError(err);
      }
    }
  };

  return { ...state, mutate };
};