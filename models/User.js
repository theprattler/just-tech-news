const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init(
  {
    // DEFINE AN ID COLUMN
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // DEFINE A USERNAME COLUMN
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // DEFINE AN EMAIL COLUMN
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // DEFINE A PASSWORD COLUMN
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // sets minimum password character length
        len: [4]
      }
    }
  },
  {
    hooks: {
      // HASH PASSWORD WHEN CREATING USER DATA
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
      },
      // HASH PASSWORD WHEN UPDATING USER DATA
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },

    // TABLE CONFIG OPTIONS GO HERE
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;