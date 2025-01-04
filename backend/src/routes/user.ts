import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL : string
      JWT_SECRET : string
    }
  }>()

  userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
  
    try{
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      });
    
      const token = await sign({id: user.id, email: user.email}, c.env.JWT_SECRET);
    
      return c.json({jwt: token});
    }
    catch(e){
      c.status(403);
      return c.json({msg: "user already exists"});
    }
    
  })
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
  
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    });
  
    if(!user){
      c.status(403);
      return c.json({msg: "user doesn't exist"});
    }
  
    const token = await sign({id: user.id, email: user.email}, c.env.JWT_SECRET);
    return c.json({jwt: token});
  
  })
  

export default userRouter