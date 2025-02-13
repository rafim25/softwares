import useSWR from "swr";
import { grafanaService } from "@/services/api";
import { useDispatch } from "react-redux";
import {
  setJourneys,
  setLoading,
  setError,
} from "@/features/customerJourney/slice";

export const useCustomerJourneys = (query: string) => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSWR(
    query ? ["customerJourneys", query] : null,
    () => grafanaService.fetchCustomerJourneys(query),
    {
      onSuccess: (data) => {
        dispatch(setJourneys(data.data));
      },
      onError: (error) => {
        dispatch(setError(error.message));
      },
    }
  );

  return {
    data,
    isLoading,
    error,
  };
};
