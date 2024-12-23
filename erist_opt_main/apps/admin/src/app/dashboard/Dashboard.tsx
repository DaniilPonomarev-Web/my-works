import { Container, Grid, Typography } from '@material-ui/core';
import AppWidgetSummary from './app-widget-summary';
import { useState, useEffect } from 'react';
import dataProvider from '../libs/dataProvider';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import * as dayjs from 'dayjs';
export const Dashboard = () => {
  let time = new Date().toLocaleTimeString();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ctime, setTime] = useState(time);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dataProvider.getDashboard();
        setDashboardData(response);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const chartData = {
    labels: dashboardData?.salesData?.map((item: any) => item.date) || [],
    datasets: [
      {
        label: 'Продажи',
        data: dashboardData?.salesData?.map((item: any) => item.amount) || [],
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Дата',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Сумма',
        },
      },
    },
  };

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" sx={{ mb: 1 }}>
        {/* {dashboardData?.customer}, 👋👋👋 */}

        {ctime}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Всего заказов"
            total={dashboardData?.countOrder}
            color="success"
            icon={
              <img alt="icon" src="../../assets/icons/glass/ic_glass_bag.png" />
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Покупателей"
            total={dashboardData?.countUsers}
            color="info"
            icon={
              <img
                alt="icon"
                src="../../assets/icons/glass/ic_glass_users.png"
              />
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Товаров"
            total={dashboardData?.countProducts}
            color="warning"
            icon={
              <img alt="icon" src="../../assets/icons/glass/ic_glass_buy.png" />
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Сумма заказов"
            total={dashboardData?.summOrders}
            color="error"
            icon={
              <img
                alt="icon"
                src="../../assets/icons/glass/ic_glass_message.png"
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            График продаж
          </Typography>
          <div style={{ height: '300px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
