const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const sequelize = require('../config/conection');

class User extends Model {
  checkPassword(loginPw) {
    return bcryptjs.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
    },
  },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    hooks: {
      // Hook to hash the password before saving a user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcryptjs.hash(newUserData.password, 10);
        return newUserData;
      },
      // Hook to hash the password before updating a user
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcryptjs.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
  }
);

module.exports = User;