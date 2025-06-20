import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt , sign } from 'hono/jwt';

// Create the main Hono app
// 👇 Tell Hono about your Bindings
const app = new Hono<{Bindings : Bindings}>();

// 👇 Define the environment types
type Bindings = {
  DATABASE_URL : string;
  JWT_SECRET : string;
}

app.get('/' , async (c) => {
  return c.text('hello from hono!');
})

app.post('/api/v1/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
 
  const body = await c.req.json();
   
  try{ 
    const user = await prisma.user.create({
      data : {
        email : body.email,
        password : body.password,
      }
    });

    const token = await sign({id : user.id} , c.env.JWT_SECRET);

    return c.json({
      jwt : token,
    });
  }
  catch(error){
   c.status(403);
   return c.json({
      success : false,
      message : 'Failed singing up user',
      details : error,
   });
  }
});

app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
 
  const body = await c.req.json();
   
  try{ 
    const user = await prisma.user.findUnique({
      where : {
        email : body.email,
        password : body.password,
      }
    });

    return c.json({
      success : true,
      message : 'user signed in successfully!',
      user : user,
    });
  }
  catch(error){
   c.status(403);
   return c.json({
      success : false,
      message : 'Failed singing in user',
      details : error,
   });
  }
})

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;