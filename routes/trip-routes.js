const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Trip = require('../models/Trip-model');
const Copilot = require('../models')