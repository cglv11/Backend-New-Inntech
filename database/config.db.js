const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise'); 
const fs = require('fs');
const path = require('path');

class SequelizeSingleton {
    constructor() {
        if (!SequelizeSingleton.instance) {
            const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
                host: process.env.MYSQL_HOST,
                dialect: 'mysql',
                port: 3306,
                logging: false,
                pool: {
                    max: 10,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                define: {
                    timestamps: false
                }
            });
            SequelizeSingleton.instance = sequelize;
            this._sequelize = sequelize; 
        } else {
            this._sequelize = SequelizeSingleton.instance;
        }
    }

    get sequelize() {
        return this._sequelize;
    }

    async createDatabase() {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            multipleStatements: true
        });

        const databaseName = process.env.MYSQL_DATABASE;
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
        await connection.end();
    }

    async dbConnection() {
        try {
            await this.createDatabase();

            await this._sequelize.authenticate();
            console.log('Base de datos online');
            await this._sequelize.sync({ force: false }); 
            console.log('Modelos sincronizados exitosamente.');
            await this.executeSqlFile();
        } catch (error) {
            console.error('Error en la conexión: ', error);
        }
    }

    async executeSqlFile() {
        const sqlFilePath = path.join(__dirname, 'database.sql');

        try {
            const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
            const connection = await mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                multipleStatements: true
            });
            await connection.query(sqlContent);
            await connection.end();
            console.log('Archivo SQL leído.');
        } catch (error) {
            console.error('Fallo al leer el archivo SQL:', error);
        }
    }
}

const sequelizeSingletonInstance = new SequelizeSingleton();

module.exports = {
    sequelize: sequelizeSingletonInstance.sequelize, 
    dbConnection: sequelizeSingletonInstance.dbConnection.bind(sequelizeSingletonInstance)
};
