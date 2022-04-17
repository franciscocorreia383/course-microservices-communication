import Sequelize from 'sequelize';

const sequelize = new Sequelize("auth-db","postgres", "81549", {
    host: "localhost",
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociantion: true,
        timesTamps: false,
        underscored: true,
        underscoredAll: true,
        freezeTableName: true
    }
});

sequelize
.authenticate()
.then(() => {
    console.info("Connection has been stablished!");
})
.catch((err) => {
    console.error("Unable to connect to the database");
    console.error(err.messege);
})

export default sequelize;