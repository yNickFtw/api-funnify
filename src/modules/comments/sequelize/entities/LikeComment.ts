import { DataTypes } from "sequelize";
import database from '../../../../db/config'

const LikeComment = database.define('like_comment', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
})

export { LikeComment }
