import { useState } from "react";
import EventsTable from "./components/EventsTable";
import useEvents from "./hooks/useEvents";
import DateFilter from "./components/DateFilter";
import type { UserEvent } from "./types/types";
import { isWithinInterval, parseISO, subDays } from "date-fns";
import { Box } from "@mui/material";
import { Skeleton, Typography } from "@mui/material";
import Navbar from "./components/Navbar";

function App() {
  const { data, loading, error } = useEvents();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const setLastDays = (days: number) => {
    setStartDate(subDays(new Date(), days));
    setEndDate(new Date());
  };
  const filteredData = data.filter((event: UserEvent) => {
    if (!startDate && !endDate) return true;
    return isWithinInterval(parseISO(event.createdAt), {
      start: startDate || new Date("2025-01-01"),
      end: endDate || new Date(),
    });
  });

  if (loading)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={400}
          height={60}
          sx={{ mb: 2 }}
        />
        <Skeleton variant="rectangular" width={800} height={400} />
      </Box>
    );
  if (error)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setLastDays={setLastDays}
          />

          <EventsTable data={filteredData} />
        </Box>
      </Box>
    </>
  );
}

export default App;
