import { DataTypes } from "sequelize";
import database from '../../../../db/config'

const User = database.define('users', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT()
  },
  profileImage: {
    type: DataTypes.STRING(),
    allowNull: true
  },
  profileImageFilename: {
    type: DataTypes.STRING(),
    allowNull: true
  }
})

export { User }
