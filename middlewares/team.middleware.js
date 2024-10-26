function validateTeamInput(req, res, next) {
    const { name, members } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Team name is required' });
    }
  
    if (!Array.isArray(members)) {
      return res.status(400).json({ error: 'Members should be an array of user IDs' });
    }
  
    next();
};
  
module.exports = validateTeamInput;