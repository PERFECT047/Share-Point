import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string
    JWT_SECRET : string
  }
}>()

app.use('/api/v1/blog/*', async (c, next) => {

  const auth = c.req.header("authorization") || "";
  const token = auth.split(" ")[1];

  const success = await verify(token, c.env.JWT_SECRET);

  if(success.id){
    next();
  }
  else{
    c.status(403);
    return c.json({msg: "please signin first"});
  }

  
})

app.post('/api/v1/user/signup', async (c) => {
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

app.post('/api/v1/user/signin', async (c) => {
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

  const token = sign({id: user.id, email: user.email}, c.env.JWT_SECRET);
  return c.json({jwt: token});

})

app.get('/api/v1/blog/:id', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  

  return c.text('Hello from get blog')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello from get bulk')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello from post blog')
})

app.put('/api/v1/blog', (c) => {
 return c.text('Hello from put blog')
})

export default app
