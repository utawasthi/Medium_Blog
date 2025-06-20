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
      message : 'Unauthorized',
    });
  }

  const bearerToken = authHeader;
  
  try{
    const user = await verify(bearerToken , c.env.JWT_SECRET);

    console.log("ye hai user --> " , user);
    console.log("ye hai user_id : " , user.id);

    if(typeof user.id !== 'string'){
      console.log('userId string nhi h babu....');
    }

    if(!user || (typeof user.id !== 'string')){
      c.status(401);
      return c.json({
        success : false,
        message : 'Unauthorized',
      });
    }
    
    c.set("userId" , user.id);
    await next(); // <---- very important to await the next() , so that controller doesn't halt at middleware 
  }
  catch(error){
    c.status(401);
    return c.json({
      success : false,
      message : 'Invalid Token',
    })
  }
})

// create a blog post
blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get('userId');
  
  try{
    const createdBlog = await prisma.blog.create({
      data : {
        title : body.title,
        content : body.content,
        authorId : authorId,
      }
    });
    
    c.status(200);
    return c.json({
      success : true,
      message : 'Blog created successfully',
      blog : createdBlog,
    })

  }
  catch(error){
    c.status(401);
    return c.json({
      success : false,
      message : 'Blog Creation Failed',
      details : error,
    })
  }
});

// get all the blogs 
blogRouter.put('/bulk', async (c) => {
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany();

  return c.json({
    success : true,
    message : 'all blogs fetched successfully',
    listOfBlogs : blogs,
  })
});

// get a blog , given a blogId
blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

	const blogId = c.req.param('id');

  try{
    const blog = await prisma.blog.findFirst({
      where : {
        id : blogId,
      }
    });

    c.status(200);
    return c.json({
      success : true,
      message : 'Blog Fetched successfully',
      blog : blog,
    });
  }
  catch(error){
    c.status(404);
    return c.json({
      success : false,
      message : 'Error fetching the blog',
      details : error,
    });
  }
});

// userid --> c6206786-07dd-40c0-b69b-bc97c2298453