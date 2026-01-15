import { Box, Button, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

interface DateFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (d: Date | null) => void;
  setEndDate: (d: Date | null) => void;
  setLastDays: (days: number) => void;
}

const DateFilter = ({
  setStartDate,
  startDate,
  setEndDate,
  endDate,
  setLastDays,
}: DateFilterProps) => {
  return (
    <>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button size="small" onClick={() => setLastDays(7)}>
          Last 7 days
        </Button>
        <Button size="small" onClick={() => setLastDays(30)}>
          Last 30 days
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Paper sx={{ p: 2, mb: 3, gap: 2, display: "flex" }} elevation={2}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            slotProps={{ textField: { variant: "outlined" } }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            slotProps={{ textField: { variant: "outlined" } }}
          />
        </Paper>
      </Box>
    </>
  );
};

export default DateFilter;
