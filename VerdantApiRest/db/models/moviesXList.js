module.exports = (sequelize, DataTypes) => {
  const MoviesXList = sequelize.define('MoviesXList', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    listId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Lists',
        key: 'id',
      },
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Movies',
        key: 'id',
      },
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

  return MoviesXList;
};
