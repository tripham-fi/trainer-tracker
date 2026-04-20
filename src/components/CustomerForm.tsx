import { DialogContent, TextField } from "@mui/material";
import type { Customer } from "../types";

type props = {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
};

export default function CustomerForm({ customer, setCustomer }: props) {
  return (
    <DialogContent sx={{ pt: 2 }}>
      <TextField
        required
        margin="dense"
        label="First Name"
        fullWidth
        variant="standard"
        value={customer.firstname}
        onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="Last Name"
        fullWidth
        variant="standard"
        value={customer.lastname}
        onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="Street Address"
        fullWidth
        variant="standard"
        value={customer.streetaddress}
        onChange={(e) => setCustomer({ ...customer, streetaddress: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="Post Code"
        fullWidth
        variant="standard"
        value={customer.postcode}
        onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="City"
        fullWidth
        variant="standard"
        value={customer.city}
        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="Email"
        fullWidth
        variant="standard"
        value={customer.email}
        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="Phone Number"
        fullWidth
        variant="standard"
        value={customer.phone}
        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
      />
    </DialogContent>
  );
}