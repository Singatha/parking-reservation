const express = require('express');
const app = express();
const port = 3000;

const auth = require('./routes/authRoutes');
const parkingReservation = require('./routes/parkingReservationRoutes');

app.use('/api/auth', auth);
app.use('/api/parking', parkingReservation);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
