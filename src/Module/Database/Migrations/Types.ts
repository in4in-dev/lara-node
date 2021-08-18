let { DataTypes } = require("sequelize");

export default {
    STRING : DataTypes.STRING,
    TEXT : DataTypes.TEXT,
    TINYTEXT : DataTypes.TEXT('tiny'),
    LONGTEXT :  DataTypes.TEXT('long'),
    MEDIUMTEXT : DataTypes.TEXT('medium'),
    CITEXT : DataTypes.CITEXT,
    BOOLEAN : DataTypes.BOOLEAN,
    TINYINT : DataTypes.BOOLEAN,
    INTEGER : DataTypes.INTEGER,
    BIGINT : DataTypes.BIGINT,
    FLOAT : DataTypes.FLOAT,
    REAL : DataTypes.REAL,
    DOUBLE : DataTypes.DOUBLE,
    DECIMAL : DataTypes.DECIMAL,
    DATETIME : DataTypes.DATE,
    DATE : DataTypes.DATEONLY,
    BLOB : DataTypes.BLOB,
    TINYBLOB : DataTypes.BLOB('tiny'),
    MEDIUMBLOB : DataTypes.BLOB('medium'),
    LONGBLOB : DataTypes.BLOB('long'),
    ENUM : DataTypes.ENUM,
    JSON : DataTypes.JSON
};
