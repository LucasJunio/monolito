/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AuthenticationProvider', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    provider_type: {
      type: DataTypes.ENUM('facebook', 'linkedin'),
      allowNull: false
    },
    id_provider: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: false,
    },
    created_at: { type: DataTypes.DATE},
    updated_at: { type: DataTypes.DATE}
  }, {
    sequelize,
    tableName: 'authentication_provider',
    underscored: true,
    timestamps: true
  });
};
