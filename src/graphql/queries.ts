import { gql } from "@apollo/client";

export const GET_RESERVATIONS = gql`
  query GetReservations($customerId: String!) {
    listCalendars(
      where: {
        customers: { some: { id: { equals: $customerId } } }
        state: { equals: Open }
      }
    ) {
      id
      from
      to
      carts {
        id
        name
        price
        calendar {
          eventType
        }
        item {
          name
          duration
          price
          picture {
            secret
          }
        }
      }
      shop {
        name
        address {
          street
          city
        }
        phone
      }
    }
  }
`;

export const GET_CUSTOMER = gql`
  query GetCustomer($id: String!) {
    getCustomer(where: { id: $id }) {
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
