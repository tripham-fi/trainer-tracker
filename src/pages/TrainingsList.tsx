import { useEffect, useState } from "react";
import type { TrainingWithCustomer } from "../types";
import consumer from "../api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Box, Container, IconButton, TextField, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import { useModal } from "../ModalContext";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

dayjs.extend(utc);

function TrainingsList() {
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
  const [search, setSearch] = useState<string>("");
  const { openModal } = useModal();

  useEffect(() => {
    consumer.training
      .getAllWithCustomer()
      .then((data) => setTrainings(data))
      .catch((error) => console.error("Error fetching trainings:", error));
  }, []);

  const deleteTraining = async (training: TrainingWithCustomer) => {
    if (!training.id) return;

    try {
      await consumer.training.delete(training.id);
      // Refresh the list
      consumer.training
        .getAllWithCustomer()
        .then((data) => setTrainings(data))
        .catch((error) => console.error("Error refreshing trainings:", error));
    } catch (err) {
      console.error("Error deleting training:", err);
    }
  };

  const handleDeleteTraining = (training: TrainingWithCustomer) => {
    openModal(
      <DeleteConfirmModal
        title="Delete Training"
        message={`Are you sure you want to delete the training "${training.activity}" on ${dayjs.utc(training.date).format("DD.MM.YYYY HH:mm")}?`}
        onConfirm={() => deleteTraining(training)}
      />
    );
  };

  const filteredTrainings = trainings.filter((t) =>
    t.activity.toLowerCase().includes(search.toLowerCase()),
  );

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 250,
      valueFormatter: (params) =>
        typeof params === "string" ? dayjs.utc(params as string).format("DD.MM.YYYY HH:mm") : "",
    },
    { field: "duration", headerName: "Duration (min)", width: 140 },
    { field: "activity", headerName: "Activity", width: 180 },
    {
      field: "customer",
      headerName: "Customer Name",
      width: 200,
      valueGetter: (_, row) =>
        `${row.customer.firstname} ${row.customer.lastname}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDeleteTraining(params.row)}
          color="error"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Trainings
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search trainings"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by activity..."
        />
      </Box>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={filteredTrainings}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </div>
    </Container>
  );
}

export default TrainingsList;
