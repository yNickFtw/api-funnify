import { DataTypes } from 'sequelize'
import database from '../../../../db/config'

const Post = database.define('posts', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  imageFilename: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  videoUrl: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  videoFilename: {
    type: DataTypes.STRING(),
    allowNull: true
  }
})

export { Post }
