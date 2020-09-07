const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../database/connection');

const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'openid'
];

const OAuth2 = google.auth.OAuth2;
const router = new express.Router();

const userGoogleAuthController = {
  async link(req, res) {},
  async callback(req, res) {},
  async authenticate(req, res) {}
};

module.exports = userGoogleAuthController;
