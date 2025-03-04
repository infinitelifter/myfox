import { gql } from "@apollo/client";

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer(
    $data: CustomerUpdateInput!
    $where: CustomerWhereUniqueInput!
  ) {
    updateCustomer(data: $data, where: $where) {
      id
      name
      surname
      email
      phone
      address
      picture {
        secret
      }
    }
  }
`;
