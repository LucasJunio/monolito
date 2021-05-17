/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Address', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cep: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    public_place: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    complement: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    number: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    neighborhood: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    created_at: { type: DataTypes.DATE},
    updated_at: { type: DataTypes.DATE}
  }, {
    sequelize,
    tableName: 'address',
    underscored: true,
    timestamps: true
  });
};
