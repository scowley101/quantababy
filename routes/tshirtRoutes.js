import express from 'express';

export const tshirtRoutes = express.Router();

tshirtRoutes.get('/tshirt', (req, res) => {
  res.status(200).send({
    tshirt: '👕',
    size: 'large',
  });
});

tshirtRoutes.post('/tshirt/:id', (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({
      message: 'Please provide a logo',
    });
  }

  res.send({
    tshirt: `👕 with your ${logo} and id ${id}`,
  });
});