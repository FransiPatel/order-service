const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = 3002;  // Make sure it's the correct port

app.use(bodyParser.json());
app.use('/orders', orderRoutes);  // Mount order routes correctly

app.listen(port, () => {
  console.log(`Order Service is running on http://localhost:${port}`);
});
