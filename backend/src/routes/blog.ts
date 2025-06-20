import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt , sign, verify } from 'hono/jwt';

export const blogRouter = new Hono<
  {
    Bindings : Bindings;
    Variables : Variables
  }
>();

type Bindings = {
  DATABASE_URL : string;
  JWT_SECRET : string;
}

type Variables = {
  userId : string;
}

// middleware logic --> 

blogRouter.use('/*' , async (c , next) => {

  const authHeader = c.req.header('Authorization');
  if(!authHeader){
    c.status(401);
    return c.json({
      success : false,
      messagae : 'Unauthorized',
    });
  }

  const bearerToken = authHeader.split(' ')[1];
  const user = await verify(bearerToken , c.env.JWT_SECRET);

  if(!user){
    c.status(401);
    return c.json({
      success : false,
      message : 'Unauthorized',
    });
  }

  c.set("userId" , user.id);

  next();
})

// create a blog post

blogRouter.post('/', (c) => {

	return c.text('signin route')
})

blogRouter.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	return c.text('get blog route')
})



blogRouter.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})