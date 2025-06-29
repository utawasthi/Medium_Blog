import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from '@utawasthi/common';

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

  const {success} = signupInput.safeParse(body);

  if(!success){
    c.status(411);
    return c.json({
      success : false,
      message : 'Signup Inputs Types are not Correct'
    });
  }
   
  try{ 
    const user = await prisma.user.create({
      data : {
        name : body.name,
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

  const {success} = signinInput.safeParse(body);

  if(!success){
    c.status(411);
    return c.json({
      success : false,
      message : 'Sign In Input Types are not Correct',
    });
  }
   
  try{ 
    const user = await prisma.user.findUnique({
      where : {
        email : body.email,
        password : body.password,
      }
    });

    if(!user){
      c.status(400);
      return c.json({
        success : false,
        message : "User doesn't exist",
      });
    }

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