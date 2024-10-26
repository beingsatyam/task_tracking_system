const Team = require('../models/team.model');
const User = require('../models/user.model');


async function createTeam(req, res) {
  try {
    const { name, description, members } = req.body;
    const owner = req.user._id; 

    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res.status(400).json({ error: 'Team name already exists' });
    }

    const team = new Team({
      name,
      description,
      owner,
      members: [...members, owner], 
    });

    await team.save();
    res.status(201).json({ message: 'Team created successfully', team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
};


async function inviteMember(req, res) {
  try {
    const { teamId, userId } = req.body;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }


    if (!team.owner.equals(req.user._id)) {
      return res.status(403).json({ error: 'Only the team owner can invite members' });
    }

    if (team.members.includes(userId)) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    team.members.push(userId);
    await team.save();

    res.json({ message: 'Member invited successfully', team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to invite member' });
  }
};

module.exports = { createTeam, inviteMember };
