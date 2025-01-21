import { Hono } from 'hono';
import userRouter from './routes/user';
import blogRouter from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Apply CORS middleware for all routes
app.use('/*', cors({
  origin: 'https://medium-clone-snowy-five.vercel.app', // Replace with your frontend domain
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // Cache for 1 day
}));

// Define routes
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

// Export the app for deployment
export default app;


// import { Hono } from 'hono'
// import userRouter from './routes/user';
// import blogRouter from './routes/blog';
// import {cors} from 'hono/cors';

// const app = new Hono<{
// 	Bindings: {
// 		DATABASE_URL: string
//     JWT_SECRET : string
// 	}
// }>();

// app.use('/*',cors());
// app.route("/api/v1/user",userRouter)
// app.route("/api/v1/blog",blogRouter)


// export default app
