import { Hono } from 'hono';
import { cors } from "hono/cors";
import { userRouter } from './routes/userRoutes';
import { blogRouter } from './routes/blogRoutes';

// Create the main Hono app
// 👇 Tell Hono about your Bindings
const app = new Hono<{Bindings : Bindings}>();

app.use('/*' , cors());

// 👇 Define the environment types
type Bindings = {
  DATABASE_URL : string;
  JWT_SECRET : string;
}

app.route('/api/v1/user' , userRouter);
app.route('/api/v1/blog' , blogRouter);

app.get('/' , async (c) => {
  return c.text('hello from hono!');
})

export default app;