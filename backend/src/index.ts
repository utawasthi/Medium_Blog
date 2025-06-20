import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt , sign } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

// Create the main Hono app
// 👇 Tell Hono about your Bindings
const app = new Hono<{Bindings : Bindings}>();

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