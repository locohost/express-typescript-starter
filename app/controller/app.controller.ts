// app/controller/app.controller.ts 

// Import only what we need from express
import { Router, Request, Response } from 'express';
import AppData from '../data/mongo/app.data.mongo';

// Assign router to the express.Router() instance
const router: Router = Router();

// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    res.send('Hello, World!');
});

router.get('/:id', (req: Request, res: Response) => {
    // Extract the id from the request parameters
    let { id } = req.params;
});

// Export the express.Router() instance to be used by server.ts
export const AppController: Router = router;
