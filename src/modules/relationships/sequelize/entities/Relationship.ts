import { DataTypes } from 'sequelize'
import database from '../../../../db/config'

const Relationship = database.define('relationships', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  }
})

export { Relationship }
