import express from 'express'
import * as UserController from '../controllers/UserController.mjs'


const api = express.Router();

const checkEditor = checkRoles('PILOT');
const checkAdmin  = checkRoles('COPILOT');