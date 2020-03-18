const _ = require("lodash");
const Joi = require("joi");
const {
  User
} = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const generateAuthToken = () => {

}

router.post("/", async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({
    email: req.body.email
  });

  let user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();

  res.send(token);
});


function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;