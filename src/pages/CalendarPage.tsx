import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { CalendarEvent, TrainingWithCustomer } from "../types";
import consumer from "../api";
import { Container, Typography } from "@mui/material";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    consumer.training
      .getAllWithCustomer()
      .then((data: TrainingWithCustomer[]) => {
        const calendarEvents: CalendarEvent[] = data.map((t) => {
          const startDate = moment(t.date).toDate();
          const endDate = moment(t.date).add(t.duration, "minutes").toDate();

          return {
            id: t.id,
            title: `${t.activity} (${t.duration} min) - ${t.customer.firstname} ${t.customer.lastname}`,
            start: startDate,
            end: endDate,
            allDay: false,
          };
        });
        setEvents(calendarEvents);
      })
      .catch((err) => console.error("Error loading calendar:", err));
  }, []);

  const eventPropGetter = () => ({
    style: {
      color: 'white',
      borderRadius: '4px',
      padding: '2px 4px',
      fontSize: '0.90rem',
      whiteSpace: 'nowrap',
    },
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Training Calendar
      </Typography>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={Views.WEEK}
        eventPropGetter={eventPropGetter}
        messages={{
          today: "Today",
          previous: "Previous",
          next: "Next",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
      />
    </Container>
  );
}

export default CalendarPage;
