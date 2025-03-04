import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_CUSTOMER } from "../graphql/mutations";
import { GET_CUSTOMER } from "../graphql/queries";

export const useCustomer = (customerId: string) => {
  const { data, loading, error, refetch } = useQuery(GET_CUSTOMER, {
    variables: { id: customerId },
  });

  const [updateCustomer, updateResult] = useMutation(UPDATE_CUSTOMER, {
    refetchQueries: [{ query: GET_CUSTOMER, variables: { id: customerId } }],
  });

  return {
    customer: data?.getCustomer,
    loading,
    error,
    refetch,
    updateCustomer,
    updateCustomerResult: updateResult,
  };
};
