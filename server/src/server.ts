import express from 'express';
const fs = require('fs');
import { Alert } from './models/alert';

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

function addNewAlert() {
  fs.readFile('data.json', 'utf8', (err: any, data: string) => {
    if (err) {
      console.error(err);
      return;
    }
    const alerts: Alert[] = JSON.parse(data);

    // Example of creating a new alert object, you can adjust this according to your needs
    const newAlert: Alert = {
      name: 'New Alert',
      severity: 1,
      description: 'New alert added',
      date: Date.now(),
      source: 'System',
      id: alerts.length.toString(), // Assuming ids are just incremental numbers
      active: true
    };

    alerts.push(newAlert);

    fs.writeFile('data.json', JSON.stringify(alerts), (err: any) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('New alert added to data.json');
    });
  });
}

const interval = setInterval(addNewAlert, 15000);

// Stop adding objects after 4 minutes
setTimeout(() => {
  clearInterval(interval);
  console.log('Stopped adding alerts');
}, 35000);

function authenticateUser(username: string, password: string) {
  // Replace this with actual authentication logic
  return (username === 'admin@admin.com' && password === 'admin');
}

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (authenticateUser(email, password)) {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.get('/api/alerts', (req, res) => {
  fs.readFile('data.json', 'utf8', (err: any, data: string) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const alerts: Alert[] = JSON.parse(data);
    const activeAlerts = alerts.filter((alert) => {
      return alert.active === true;
    });
    res.json(activeAlerts);
  });
});

app.post('/api/alerts', (req, res) => {
  const newAlerts = req.body;

  fs.writeFile('data.json', JSON.stringify(newAlerts), (err: any) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('User added successfully');
  });
});

app.put('/api/alerts/:id', (req, res) => {
  const alertId = req.params.id;
  const updatedAlertData = req.body;

  fs.readFile('data.json', 'utf8', (err: any, data: string) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    let alerts: Alert[] = JSON.parse(data);
    const alertIndex = alerts.findIndex((alert) => alert.id === alertId);

    if (alertIndex === -1) {
      res.status(404).send('User not found');
      return;
    }
    alerts[alertIndex] = { ...updatedAlertData };
    fs.writeFile('data.json', JSON.stringify(alerts), (err: any) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).json(updatedAlertData);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
