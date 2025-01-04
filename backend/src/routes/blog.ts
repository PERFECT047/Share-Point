import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";

const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL : string
      JWT_SECRET : string
    },
    Variables: {
        userId: string;
    }
  }>();

  blogRouter.use('/*', async (c, next) => {
    const token = c.req.header("Authorization") || "";

    try {
        const payload = await verify(token, c.env.JWT_SECRET); // Use jwt.verify
        const userId = payload.id;
        if (!userId) {
          return c.json({ message: 'Invalid token payload: missing user ID' }, 403);
        }

        c.set('userId', userId);
        await next();
      } 
      catch (error) {
        console.error('JWT Verification Error:', error);
        return c.json({ message: 'Unauthorized: invalid token' }, 403);
      }
});

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
      const blogs = await prisma.post.findMany();

      if(!blogs){
        c.status(403);
        return c.json({"message" : "Blog not found"});
      }

      return c.json({blogs});
  })
  
  blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blog = await prisma.post.findFirst({
        where: {
            id: c.req.param("id")
        }
    })

    if(!blog){
        c.status(403);
        return c.json({"message" : "Blog not found"});
    }

    return c.json({blog});
  })
  
  blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body = await c.req.json();

      const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get("userId")
        }
      });

      if(!blog){
        c.status(403);
        return c.json({"message" : "Blog could not be created"});
      }

      return c.json({blog});
  })
  
  blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const body = await c.req.json();

      const blog = await prisma.post.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get("userId")
        }
      });

      if(!blog){
        c.status(403);
        return c.json({"message" : "Blog could not be updated"});
      }

      return c.json({blog});
  })

  export default blogRouter;