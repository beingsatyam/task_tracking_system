const express = require('express');
const { createTeam, inviteMember } = require('../controllers/team.controller');
const { protect } = require('../middlewares/validate.middleware');
const validateTeamInput = require('../middlewares/team.middleware');

const router = express.Router();

router.post('/', protect, validateTeamInput, createTeam);

router.post('/invite', protect, inviteMember);

module.exports = router;
