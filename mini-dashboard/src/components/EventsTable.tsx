import { useMemo, useState, type JSX } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import type { UserEvent } from "../types/types";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UpdateIcon from "@mui/icons-material/Update";
import type { MRT_Row } from "material-react-table";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Chip,
  Paper,
} from "@mui/material";
import EventsChart from "./EventsChart";

interface EventsTableProps {
  data: UserEvent[];
}

const statusColorMap: Record<string, "success" | "warning" | "error"> = {
  success: "success",
  pending: "warning",
  failed: "error",
};

const typeIconMap: Record<string, JSX.Element> = {
  login: <LoginIcon fontSize="small" />,
  logout: <LogoutIcon fontSize="small" />,
  purchase: <ShoppingCartIcon fontSize="small" />,
  update: <UpdateIcon fontSize="small" />,
};

const Detail = ({
  label,
  value,
}: {
  label: string;
  value: string | number | JSX.Element | null;
}) => (
  <Box>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography fontWeight={600}>{value}</Typography>
  </Box>
);

const EventsTable = ({ data }: EventsTableProps) => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<UserEvent | null>(null);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  //// chart //

  const activeData = useMemo(() => {
    const selectedIds = Object.keys(selectedRows);

    if (selectedIds.length === 0) return data;

    return selectedIds.map((id) => data[Number(id)]);
  }, [selectedRows, data]);

  const chartData = useMemo(() => {
    const map = new Map<string, number>();

    activeData.forEach((event) => {
      const day = format(new Date(event.createdAt), "yyyy-MM-dd");
      map.set(day, (map.get(day) ?? 0) + 1);
    });

    return Array.from(map.entries()).map(([date, events]) => ({
      date,
      events,
    }));
  }, [activeData]);
  //// end chart //

  const columns = useMemo<MRT_ColumnDef<UserEvent>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "user", header: "User" },
      {
        accessorKey: "type",
        header: "Type",
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {typeIconMap[cell.getValue<string>()]}
            <Typography variant="body2">{cell.getValue<string>()}</Typography>
          </Box>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          return (
            <Chip
              label={status}
              color={statusColorMap[status] ?? "default"}
              size="small"
              sx={{ textTransform: "capitalize" }}
            />
          );
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        Cell: ({ cell }) =>
          cell.getValue<number>() ? (
            <Typography fontWeight={600}>
              ${cell.getValue<number>().toLocaleString()}
            </Typography>
          ) : (
            "-"
          ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ cell }) =>
          format(new Date(cell.getValue() as string), "yyyy-MM-dd HH:mm"),
      },
    ],
    []
  );

  const handleRowClick = (row: MRT_Row<UserEvent>) => {
    setSelectedEvent(row.original);
    setOpen(true);
  };

  const totalAmount = data.reduce((sum, e) => sum + (e.amount ?? 0), 0);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 2,
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Activity
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Events per day based on current filters
        </Typography>

        <EventsChart data={chartData} />
      </Paper>
      <Paper>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="caption">Total events</Typography>
            <Typography variant="h6">{data.length}</Typography>
          </Paper>

          <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="caption">Total amount</Typography>
            <Typography variant="h6">
              ${totalAmount.toLocaleString()}
            </Typography>
          </Paper>

          <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="caption">Selected events</Typography>
            <Typography variant="h6">
              {Object.keys(selectedRows).length}
            </Typography>
          </Paper>
        </Box>

        <MaterialReactTable
          columns={columns}
          data={data}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          initialState={{
            density: "compact",
          }}
          enablePagination
          enableSorting
          enableColumnFilters
          enableGlobalFilter
          enableRowSelection
          muiTablePaperProps={{
            elevation: 0,
            sx: { borderRadius: 2 },
          }}
          onRowSelectionChange={setSelectedRows}
          state={{ rowSelection: selectedRows }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => handleRowClick(row),
            sx: {
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.04)",
              },
            },
          })}
        />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Event Details</DialogTitle>
          <DialogContent dividers>
            {selectedEvent && (
              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                <Detail label="ID" value={selectedEvent.id} />
                <Detail label="User" value={selectedEvent.user} />
                <Detail label="Type" value={selectedEvent.type} />
                <Detail label="Status" value={selectedEvent.status} />
                <Detail label="Amount" value={`$${selectedEvent.amount}`} />
                <Detail
                  label="Date"
                  value={format(new Date(selectedEvent.createdAt), "PPpp")}
                />
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default EventsTable;
