const updateUserTime = (user) => ({
  upserter: user,
  updated_at: new Date()
});

module.exports = updateUserTime;
