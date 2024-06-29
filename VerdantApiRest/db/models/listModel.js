module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.ENUM('Vistas', 'Por ver', 'Favoritas'),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  List.associate = function(models) {
    List.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    List.belongsToMany(models.Movie, { through: models.MoviesXList, foreignKey: 'listId', as: 'movies' });
  };

  return List;
};
