import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt , sign, verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@utawasthi/common';

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
  console.log("ye hai bhaiyon bearer Token --> ",bearerToken)
  
  try{
    const user = await verify(bearerToken , c.env.JWT_SECRET);

    if(!user){
      c.status(401);
      return c.json({
        success : false,
        message : 'Unauthorized',
      });
    }
    
    c.set("userId" , user.id + ""); // bcoz userId is Int , so i converted it to string , so that c.set method could work
    await next(); // <---- very important to await the next() , so that controller doesn't halt at middleware 
  }
  catch(error){
    c.status(401);
    return c.json({
      success : false,
      message : 'Invalid Token',
      details : error,
    })
  }
})

// create a blog post
blogRouter.post('/create-blog', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get('userId');

  const {success} = createBlogInput.safeParse(body);

  if(!success){
    c.status(411);
    return c.json({
      success : false,
      message : 'Create Blog Input Types are Wrong',
    });
  }
  
  try{
    const createdBlog = await prisma.blog.create({
      data : {
        title : body.title,
        content : body.content,
        authorId : Number(authorId),
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

// update the blog 
blogRouter.put('/update-blog', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log("ye hai body --> " , body);
  const userId = c.get('userId');

  const {success} = updateBlogInput.safeParse(body);

  if(!success){
    c.status(411);
    return c.json({
      success : false,
      message : 'Update Blog Input Types are Wrong',
    });
  }
  
  try{
    const updatedBlog = await prisma.blog.update({
      where : {
        id : body.id,
        authorId : Number(userId),
      },
      data : {
        title : body.title,
        content : body.content,
      }
    });
    
    c.status(200);
    return c.json({
      success : true,
      message : 'Blog Updated successfully',
      blog : updatedBlog,
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
blogRouter.get('/bulk', async (c) => {
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log("controller reached inside /bulk route");

  const blogs = await prisma.blog.findMany();
  // console.log("controller reached inside /bulk route");

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
        id : Number(blogId),
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