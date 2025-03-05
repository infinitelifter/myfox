import React from "react";
import { Container, CircularProgress, Typography } from "@mui/material";
import { useReservations } from "../hooks/useReservations";
import ReservationCard from "../components/ReservationCard";
import { CUSTOMER_ID } from "../constants";
import { Reservation } from "../types/reservation";

const Reservations: React.FC = () => {
  const { reservations, loading, error } = useReservations(CUSTOMER_ID);

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Nemáte žádné rezervace.</Typography>;

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Moje rezervace
      </Typography>
      {reservations?.map((reservation: Reservation) => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </Container>
  );
};

export default Reservations;
