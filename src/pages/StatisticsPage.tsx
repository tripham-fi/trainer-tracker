import { useEffect, useState } from "react";
import type { stat, TrainingWithCustomer } from "../types";
import consumer from "../api";
import { Container, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function StatisticsPage() {
  const [stats, setStats] = useState<stat[]>([]);

  useEffect(() => {
    consumer.training
      .getAllWithCustomer()
      .then((data: TrainingWithCustomer[]) => {
        // Group by activity and sum duration
        const activityMap = new Map<string, number>();

        data.forEach((training) => {
          const activity = training.activity;
          const current = activityMap.get(activity) || 0;
          activityMap.set(activity, current + training.duration);
        });

        const chartData = Array.from(activityMap.entries()).map(
          ([activity, totalMinutes]) => ({
            activity: activity,
            minutes: totalMinutes,
          }),
        );

        setStats(chartData);
      })
      .catch(() => console.error("Error loading statistics:"));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Training Statistics
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Total duration by activity (in minutes)
      </Typography>

      {stats.length > 0 ? (
        <div style={{ width: "100%", height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stats}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="activity"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                label={{ 
                  value: 'Duration (min)', 
                  angle: -90, 
                  position: 'insideLeft',
                  textAnchor: 'middle',
                  style: { fontSize: '1rem', fontWeight: 'bold' }
                }}
              />
              <Tooltip />
              <Bar dataKey="minutes" fill="blue" name="Total Minutes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Typography>No training data available</Typography>
      )}
    </Container>
  );
}

export default StatisticsPage;
