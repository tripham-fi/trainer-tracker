import { Box, Container, TextField, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Customer } from "../types";
import { useEffect, useState } from "react";
import consumer from "../api";

function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const res = await consumer.customer.getAll();
        console.log(res);

        // if (!res.ok) throw new Error("Failed to fetch customers");
        // const data = await res.json();
        // const customerList = data._embedded?.customers || [];
        // setCustomers(customerList);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };

    loadCustomers();
  }, []);

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
  ];
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Customers
      </Typography>

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
          getRowId={(row) => row._links?.self?.href || Math.random()}
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
