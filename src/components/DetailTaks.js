import React, { useEffect } from "react";
import { Box, Stack, Typography, styled, Alert, Button } from "@mui/material";
import BedgeStatus from "@/common/BadgeStatus";
import { STATUS_STASK } from "@/common/Text";
import { isEmpty } from "lodash";
import { mapTaskStatus } from "@/util/Utils";

import TextField from "@mui/material/TextField";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { ButtonPrimary } from "@/common/CustomizeMUI";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";

import { useRouter } from "next/navigation";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useTheme, useMediaQuery } from "@mui/material";

const mockData = {
  id: "111",
  status: STATUS_STASK.COMPLETED,
  description: "Move the box from HCM to HN city",
  nameProduct: "Refrigerator",
  deliveryDate: "12-12-2024",
  deliveryTime: "5",
  addressCustomer:
    "Chi nhánh 6 (Lab 6): Tòa nhà TMA, Công viên phần mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12",
  numberPhoneCustomer: "(028) 3997 8000",
  noticed:
    "Enter your preferred truck driving location to personalize recommendations for the best driving .",
};

const StyleTextField = styled(TextField)(({ theme }) => ({
  margin: 0,
  disabled: "true",
  pointerEvents: "none",
  backgroundColor: theme.palette.grey[200],
  borderRadius: "5px",
}));

const DetailTaskComponent = ({ data, error, handleOnClick }) => {
  console.log(data);
  const theme = useTheme(); // Access the theme for breakpoint values

  // Define your media queries using MUI's breakpoint functions or custom queries
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Up to medium size screens

  const router = useRouter();
  console.log("data", data);

  const renderButton = () => {
    switch (data?.status) {
      case "TODO":
        return (
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Button
              variant="outlined"
              color="warning"
              sx={{
                width: "100%",
                backgroundColor: theme.palette.grey[200],
                color: "black",
              }}
              onClick={() => router.back()}
            >
              Back
            </Button>
            <ButtonPrimary sx={{ width: "100%" }} onClick={handleOnClick}>
              Start
            </ButtonPrimary>
          </Box>
        );
      case "COMPLETED":
        return (
          <ButtonPrimary onClick={() => router.back()}>Back</ButtonPrimary>
        );
      default:
        return <ButtonPrimary onClick={handleOnClick}>Continue</ButtonPrimary>;
    }
  };

  return (
    <Stack
      sx={{
        [theme.breakpoints.up("md")]: {
          //900px
          minWidth: theme.breakpoints.values.md,
        },
        margin: "10px",
      }}
      spacing={2.5}
    >
      {error && (
        <Alert severity="error" sx={{ mt: 1.5, width: "100%" }}>
          <Typography>{error}</Typography>
        </Alert>
      )}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 1,
          }}
        >
          <Typography variant="h5">Task Detail</Typography>
          <BedgeStatus status={mapTaskStatus(data?.status)} />
        </Box>
        <Typography>{data?.instruction?.description}</Typography>
      </Box>

      <Box
        sx={{
          border: "1px solid #F4721E",
          borderRadius: 2,
          padding: "10px 20px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box>
          {isMobile ? (
            <p variant="h6">Product</p>
          ) : (
            <Typography variant="h6">Product</Typography>
          )}

          <StyleTextField
            InputProps={{
              startAdornment: <ShoppingBagIcon sx={{ marginRight: 1 }} />,
              sx: { borderRadius: "5px" },
            }}
            value={data?.instruction?.nameProduct}
          />
        </Box>

        <Stack direction="row" justifyContent="start" gap={1}>
          <Box>
            {isMobile ? (
              <p variant="h6">Delivery date</p>
            ) : (
              <Typography variant="h6">Delivery Date</Typography>
            )}

            <StyleTextField
              InputProps={{
                startAdornment: <CalendarMonthIcon sx={{ marginRight: 1 }} />,
                sx: { borderRadius: "5px" },
              }}
              value={data?.deliveryDate}
            />
          </Box>
          <Box>
            {isMobile ? (
              <p variant="h6">Delivery Time</p>
            ) : (
              <Typography variant="h6">Delivery Time</Typography>
            )}

            <StyleTextField
              InputProps={{
                startAdornment: <QueryBuilderIcon sx={{ marginRight: 1 }} />,
                sx: { borderRadius: "5px" },
              }}
              value={data?.estimation_in_hours}
            />
          </Box>
        </Stack>
        <Box>
          {isMobile ? (
            <p>Address</p>
          ) : (
            <Typography variant="h6">Address</Typography>
          )}
          <StyleTextField
            multiline="true"
            sx={{ width: "100%", textAlign: "center", whiteSpace: "normal" }}
            InputProps={{
              startAdornment: <AddLocationIcon sx={{ marginRight: 1 }} />,
              sx: { borderRadius: "5px" },
            }}
            value={data?.instruction?.addressCustomer}
          />
        </Box>

        <Box>
          {isMobile ? (
            <p variant="h6">Phone</p>
          ) : (
            <Typography variant="h6">Phone</Typography>
          )}
          <StyleTextField
            multiline="true"
            sx={{ width: "100%", textAlign: "center", whiteSpace: "normal" }}
            InputProps={{
              startAdornment: <PermPhoneMsgIcon sx={{ marginRight: 1 }} />,
              sx: { borderRadius: "5px" },
            }}
            value={data?.instruction?.numberPhoneCustomer}
          />
        </Box>
      </Box>

      {!isEmpty(data?.instruction?.note) ? (
        <Box>
          <Typography variant="h5">Noticed</Typography>
          <p>{data?.instruction?.note}</p>
        </Box>
      ) : undefined}

      {renderButton(data?.status)}
    </Stack>
  );
};

export default DetailTaskComponent;
