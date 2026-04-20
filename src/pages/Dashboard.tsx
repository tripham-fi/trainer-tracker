import {Container, Typography} from '@mui/material'

function Dashboard() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Personal Trainer Customer Database
      </Typography>
      <Typography variant="body1">
        Use the navigation above to view Customers or Trainings.
      </Typography>
    </Container>
  );
}

export default Dashboard;
