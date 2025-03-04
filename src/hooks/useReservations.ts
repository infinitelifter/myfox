import { useQuery } from "@apollo/client";
import { GET_RESERVATIONS } from "../graphql/queries";

export const useReservations = (customerId: string) => {
  const { data, loading, error, refetch } = useQuery(GET_RESERVATIONS, {
    variables: { customerId },
  });

  return {
    reservations: data?.listCalendars,
    loading,
    error,
    refetch,
  };
};
