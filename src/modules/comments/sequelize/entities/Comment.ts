import { DataTypes } from "sequelize";
import database from '../../../../db/config'

const Comment = database.define('comments', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING(),
    allowNull: false,
  }
})

export { Comment }
