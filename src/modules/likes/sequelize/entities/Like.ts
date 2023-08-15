import { DataTypes } from 'sequelize'
import database from '../../../../db/config'

const Like = database.define('likes', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  }
})

export { Like }
