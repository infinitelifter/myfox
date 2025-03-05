export interface Reservation {
  id: string;
  from: string;
  to: string;
  subject: {
    alias: string;
  };
  carts: Array<{
    id: string;
    name: string;
    price: number;
    calendar: {
      eventType: string;
    };
    item: {
      name: string;
      duration: number;
      price: number;
      picture?: {
        secret: string;
      };
    };
  }>;
  shop: {
    name: string;
    address: {
      street: string;
      city: string;
    };
    phone: string;
  };
}
