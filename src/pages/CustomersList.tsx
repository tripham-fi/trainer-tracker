import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Customer } from "../types";
import { useEffect, useState } from "react";
import consumer from "../api";
import { useModal } from "../ModalContext";
import CustomerModal from "../components/modals/CustomerModal";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const { openModal } = useModal();

  const refreshCustomers = () => {
    consumer.customer
      .getAll()
      .then((data) => setCustomers(data))
      .catch((err) => console.error("Error refreshing customers:", err));
  };

  useEffect(() => {
    refreshCustomers();
  }, []);

  const deleteCustomer = async (customer: Customer) => {
    const url = customer._links?.self?.href;
    if (!url) return;

    try {
      await consumer.customer.delete(url);
      refreshCustomers();
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  const handleAddCustomer = () => {
    openModal(<CustomerModal onSuccess={refreshCustomers} />);
  };

  const handleEditCustomer = (customer: Customer) => {
    openModal(
      <CustomerModal customer={customer} onSuccess={refreshCustomers} />,
    );
  };

  const handleDeleteCustomer = (customer: Customer) => {
    openModal(
      <DeleteConfirmModal
        title="Delete Customer"
        message={`Are you sure you want to delete ${customer.firstname} ${customer.lastname}?`}
        onConfirm={() => deleteCustomer(customer)}
      />,
    );
  };

  const filteredCustomers = customers.filter(
    (c) =>
      `${c.firstname} ${c.lastname}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()),
  );

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First Name", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    { field: "streetaddress", headerName: "Address", width: 200 },
    { field: "postcode", headerName: "Postcode", width: 120 },
    { field: "city", headerName: "City", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => handleEditCustomer(params.row)}
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteCustomer(params.row)}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Customers</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCustomer}
        >
          Add Customer
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search customers"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or city..."
        />
      </Box>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={filteredCustomers}
          columns={columns}
          getRowId={(row) => row.id || Math.random()}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </div>
    </Container>
  );
}

export default CustomersList;
