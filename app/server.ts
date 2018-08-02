// app/server.ts

// Import everything from express and assign it to the express variable
import express from 'express';
// Import controllers
import { 
    AppController, 
    MessageController, 
    ProcessController, 
    RoleController, 
    SubscriberController, 
    UserController, 
    HomeController 
} from './controller/__index';

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port: string = process.env.PORT || '3000';

// Mount all routing controllers
app.use('/app', AppController);
app.use('/home', HomeController);
app.use('/message', MessageController);
app.use('/process', ProcessController);
app.use('/role', RoleController);
app.use('/subscriber', SubscriberController);
app.use('/user', UserController);

// Serve the application at the given port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
