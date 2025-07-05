import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
      userId: string
    }
}>()

blogRouter.use('/*', async (c, next) => {
  //get the header
  const authHeader = c.req.header("authorization")  || "";
  try{
  const user =await verify(authHeader, c.env.JWT_SECRET)
  console.log("hello1")
  if(user){
    c.set("userId", user.id as string);
    console.log("hello2")
    await next()
  } else{
    return c.json({
      message: "You are not logged in"
      })
    }
  } catch(e){
    c.status(403);
    return c.json({
      message: "You are not logged in"
    })
  }
})



blogRouter.post('/', async (c) => {
  console.log("hello3")
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

  const body = await c.req.json();
  const authorId = c.get("userId");
  console.log("hello4")
try{
  console.log("hello5")
  const blog = await prisma.post.create({
    data:{
      title: body.title,
      content: body.content,
      authorId: authorId
    }
  })
  console.log("hello6")
  return c.json({
    id: blog.id
  })
   } catch(e){
    c.status(411);
    return c.json({
      message: "Error while fetching blog post"
    })
  }
})

blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content
    }
  })

  return c.json({
    id: blog.id
  })
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany();

  return c.json({
    blogs
  })
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param("id");
  const prisma = new  PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

try{
  const blog = await prisma.post.findFirst({
    where: {
      id: id
    },
  })

  return c.json({
    blog
    })
  } catch(e){
    c.status(411);
    return c.json({
      message: "Error while fetching blog post"
    })
  }
})
