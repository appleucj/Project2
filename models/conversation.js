"use strict";
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Conversation = sequelize.define('Conversation', {
    name: DataTypes.STRING
}, {});
  Conversation.associate = function(models) {
    Conversation.hasMany(models.Conversation)
  };
  return Conversation ;
};