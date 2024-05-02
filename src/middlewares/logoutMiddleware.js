const logout = (req, res) => {
	const cookieOptions = {
		maxAge: 30 * 1000,
		httpOnly: true,
		sameSite: "strict",
		secure: true,
	};
	res.cookie("session_token", "", cookieOptions);
	return res.status(200).json({ success: true });
};

module.exports = logout;
