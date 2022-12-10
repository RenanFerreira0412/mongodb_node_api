import express from 'express';
import routes from './routes';
import 'reflect-metadata';

import setup from "./database/connect"



const app = express();
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    }),
)

//Utilização das rotas definidas
app.use(routes);

//Inicialização e conexão com o MongoDB
setup()
app.listen(3000, () => console.log('Server started at http://localhost:3000'));


// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
