import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signUpInput, signInInput } from "@perfect047/sharepiont-common"


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

    const{ success } = signUpInput.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({"message": "Invalid Input"});
    }
  
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
    
  });
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();

    const{ success } = signInInput.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({"message": "Invalid Input"});
    }
  
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