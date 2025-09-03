const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullName, email, phone, password, role } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ fullName, email, phone, password, role });
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(201)
      .json({ user: { id: user._id, fullName, email, role }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      user: { id: user._id, fullName: user.fullName, email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
