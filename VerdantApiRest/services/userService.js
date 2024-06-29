
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { List, MoviesXList, Movie, User } = require('../db/models');




const register = async (username, email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
      console.log("Ya existe una cuenta con ese email");
      throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword });
  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Crear listas predefinidas
  const predefinedLists = ["Por ver", "Vistas", "Favoritas"];
  for (const listName of predefinedLists) {
      await List.create({ userId: newUser.id, name: listName });
  }

  return { token };
};
const login = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  await user.update(userData);
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  await user.destroy();
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
