import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';

export const userRouter = new Hono<{Bindings : Bindings}>();

// 👇 Define the environment types
type Bindings = {
  DATABASE_URL : string;
  JWT_SECRET : string;
}

userRouter.post('/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
 
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
   console.log(error);
   return c.json({
      success : false,
      message : 'Failed singing up user',
      details : error,
   });
  }
});

userRouter.post('/signin', async (c) => {
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
});


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwYmM5YTM0LTI4ZTgtNGU1MS1iYmM3LWYyNzI4MmZmMjYxYiJ9.YOeWXgHudQauAEY4po9w7tET4_FZBxlNWUXWlLeSCVQ"