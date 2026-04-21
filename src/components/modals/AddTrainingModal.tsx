import { useState } from "react";
import { useModal } from "../../ModalContext";
import type { AddTrainingRequest, Customer } from "../../types";
import consumer from "../../api";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type Props = {
  customer: Customer;
  onSuccess: () => void;
};

export default function AddTrainingModal({ customer, onSuccess }: Props) {
  const { closeModal } = useModal();

  const [date, setDate] = useState(dayjs());
  const [duration, setDuration] = useState(60);
  const [activity, setActivity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!activity.trim()) {
      setError("Activity is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const customerUrl = customer._links?.self?.href;
      if (!customerUrl) {
        setError("Customer link not found");
        return;
      }

      const trainingData: AddTrainingRequest = {
        date: date.toISOString(),
        activity: activity.trim(),
        duration: Number(duration),
        customer: customerUrl
      };

      await consumer.training.create(trainingData);

      onSuccess();
      closeModal();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to add training";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogTitle>
        Add Training for {customer.firstname} {customer.lastname}
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <DatePicker
          label="Training Date & Time"
          value={date}
          onChange={(newDate) => newDate && setDate(newDate)}
          sx={{ width: "100%", mb: 2, mt: 2 }}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Duration (minutes)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModal} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Adding..." : "Add Training"}
        </Button>
      </DialogActions>
    </>
  );
}
