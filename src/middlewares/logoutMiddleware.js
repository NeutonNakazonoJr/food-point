const logout = (req, res) => {
	res.clearCookie("session_token");
	return res.status(200).json({ success: true });
};

module.exports = logout;
