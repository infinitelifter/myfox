import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

interface ReservationCardProps {
  reservation: any;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fetchedImageUrl, setFetchedImageUrl] = useState<string>("/logo.svg");

  const carts = reservation?.carts && reservation.carts.length > 0;

  useEffect(() => {
    const hasPicture = carts && reservation.carts[0].item.picture;
    if (hasPicture) {
      const secret = reservation.carts[0].item.picture.secret;
      fetch(`https://api.myfox.cz/test/photo/${secret}`)
        .then((res) => res.text())
        .then((url) => {
          setFetchedImageUrl(url);
        })
        .catch((err) => {
          console.error("Error fetching image URL:", err);
          setFetchedImageUrl("/logo.svg");
        });
    } else {
      setFetchedImageUrl("/logo.svg");
    }
  }, [reservation]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const shopName = reservation.shop?.name || "Název obchodu";

  const dateTime =
    typeof reservation.from === "string"
      ? reservation.from
      : JSON.stringify(reservation.from);

  const duration = "Duration";
  const price = "Price";

  return (
    <Card sx={{ display: "flex", mb: 2, p: 2 }}>
      <CardMedia
        component="img"
        sx={{
          width: 84,
          height: 84,
          borderRadius: "8px",
          objectFit: "fill",
          mr: 3,
        }}
        image={fetchedImageUrl}
        alt={shopName}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent sx={{ flex: "1 0 auto", p: 0 }}>
          <Typography component="div" variant="h6" fontWeight="bold">
            {shopName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {reservation.shop?.address?.street},{" "}
            {reservation.shop?.address?.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            tel {reservation.shop?.phone}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {reservation?.carts.length &&
                reservation?.carts[0].calendar?.eventType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dateTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {carts && reservation.carts[0].item.duration} minut,{" "}
              {carts && reservation.carts[0].item.price} Kč
            </Typography>
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{ mr: 1 }}
          >
            Trasa
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{ mr: 1 }}
          >
            Zavolat
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handlePopoverOpen}
          >
            ...
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handlePopoverClose}>
            <MenuItem onClick={handlePopoverClose}>
              Vytvořit další rezervaci
            </MenuItem>
            <MenuItem onClick={handlePopoverClose}>
              Přidat do kalendáře
            </MenuItem>
            <MenuItem onClick={handlePopoverClose}>Přidat do kontaktů</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Card>
  );
};

export default ReservationCard;
