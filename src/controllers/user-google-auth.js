const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../database/connection');
const { publicUser } = require('../utils/public');

const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'openid'
];

const OAuth2 = google.auth.OAuth2;
const router = new express.Router();

const userGoogleAuthController = {
  async link(req, res) {
    // Create an OAuth2 client object from the credentials in our config file
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    // Obtain the google login link to which we'll send our users to give us access
    const loginLink = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope
    });

    return res.redirect(loginLink);
  },
  async callback(req, res) {
    // Create an OAuth2 client object from the credentials in our config file
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    // The user did not give us permission.
    if (req.query.error)
      return res.status(400).send({ message: 'User not authenticated' });

    oauth2Client.getToken(req.query.code, (err, token) => {
      if (err) return res.status(400).send({ message: 'Some error occurred' });

      const encryptedToken = jwt.sign(token, process.env.JWT_SECRET);
      return res.redirect(`/google/me/${encryptedToken}`);
    });
  },
  async authenticate(req, res) {
    try {
      // Add this specific user's credentials to our OAuth2 client
      const credentials = jwt.verify(req.params.token, process.env.JWT_SECRET);
      const client = new OAuth2Client(process.env.CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: credentials.id_token,
        audience: process.env.CLIENT_ID
      });
      const payload = ticket.getPayload();

      // Verify if there is a user with that email
      const user = await knex('users').where({ email: payload.email }).first();

      // If there is an user with that email
      if (user) {
        // generate auth token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

        // return user and token
        const returningUser = publicUser(user);
        return res.json({ user: returningUser, token });
      }

      // If there is no user with that email
      // Create a new user
      const [newUser] = await knex('users')
        .insert({
          email: payload.email,
          name: payload.name,
          picture: payload.picture
        })
        .returning('*');
      // generate auth token
      const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET);

      // return user and token
      const returningUser = publicUser(newUser);
      return res.status(201).json({ user: returningUser, token });
    } catch (error) {
      res.status(403).json({ error });
    }
  }
};

module.exports = userGoogleAuthController;
