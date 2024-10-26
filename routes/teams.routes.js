const express = require('express');
const { createTeam, inviteMember } = require('../controllers/team.controller');
const { validUser } = require('../middlewares/validate.middleware');
const validateTeamInput = require('../middlewares/team.middleware');

const router = express.Router();

router.post('/', validUser, validateTeamInput, createTeam);

router.post('/invite', validUser, inviteMember);

module.exports = router;
