import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface EventChartProps {
  data: { date: string; events: number }[];
}

const EventsChart = ({ data }: EventChartProps) => {
  return (
    <Box sx={{ height: 220, mb: 3 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Activity (Events per day)
      </Typography>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="events"
            stroke="#1976d2"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default EventsChart;
