import { useState } from "react";
import { useModal } from "../../ModalContext";
import type { Customer } from "../../types";
import consumer from "../../api";
import { Button, DialogActions, DialogTitle, Typography } from "@mui/material";
import CustomerForm from "../CustomerForm";

type props = {
  customer?: Customer;
  onSuccess: () => void;
}

function CustomerModal({onSuccess, customer}: props) {
  const {closeModal} = useModal();

  const isEdit = !!customer;

  const [currentCustomer, setCurrentCustomer] = useState<Customer>({
    firstname: customer?.firstname || "",
    lastname: customer?.lastname || "",
    streetaddress: customer?.streetaddress || "",
    postcode: customer?.postcode || "",
    city: customer?.city || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    _links: customer?._links || {
      self: { href: "" },
      customer: { href: "" },
      trainings: { href: "" },
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      if (isEdit && customer?._links?.self?.href) {
        await consumer.customer.update(customer._links.self.href, {
          firstname: currentCustomer.firstname,
          lastname: currentCustomer.lastname,
          streetaddress: currentCustomer.streetaddress,
          postcode: currentCustomer.postcode,
          city: currentCustomer.city,
          email: currentCustomer.email,
          phone: currentCustomer.phone,
        });
      } else {
        await consumer.customer.create({
          firstname: currentCustomer.firstname,
          lastname: currentCustomer.lastname,
          streetaddress: currentCustomer.streetaddress,
          postcode: currentCustomer.postcode,
          city: currentCustomer.city,
          email: currentCustomer.email,
          phone: currentCustomer.phone,
        });
      }

      onSuccess();
      closeModal();
    } catch {
      setError("Failed to save customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogTitle>
        {isEdit ? "Edit Customer" : "Add New Customer"}
      </DialogTitle>

      {error && (
        <Typography color="error" sx={{ px: 3, pb: 1 }}>
          {error}
        </Typography>
      )}

      <CustomerForm 
        customer={currentCustomer} 
        setCustomer={setCurrentCustomer} 
      />

      <DialogActions>
        <Button onClick={closeModal} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Customer"}
        </Button>
      </DialogActions>
    </>
  );
}

export default CustomerModal;
