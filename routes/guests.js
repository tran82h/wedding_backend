const {
  Guest,
  validate
} = require('../models/guest');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObject');

router.get('/', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Invalid ID.');

  const guests = await Guests.find().sort('name');
  res.send(guests);
});

router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let guest = new Guest({
    name: req.body.name,
    phone: req.body.phone
  });
  guest = await guest.save();

  res.send(guest);
});

router.put('/:id', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const guest = await Guest.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone
  }, {
    new: true
  });

  if (!guest) return res.status(404).send('The guest with the given ID was not found.');

  res.send(guest);
});

router.delete('/:id', async (req, res) => {
  const guest = await Guest.findByIdAndRemove(req.params.id);

  if (!guest) return res.status(404).send('The guest with the given ID was not found.');

  res.send(guest);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const guest = await Guest.findById(req.params.id);

  if (!guest) return res.status(404).send('The guest with the given ID was not found.');

  res.send(guest);
});

module.exports = router;