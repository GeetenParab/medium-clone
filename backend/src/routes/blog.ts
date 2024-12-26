import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from "@geeten/medium-common";

export const blogRouter =new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET : string
	},
    Variables:{
        userId:string;
    }
}>();


blogRouter.use('/*', async (c, next) => {

      const header  = c.req.header("authorization")|| "";
      const token  = header.split(" ")[1];

    try {
          
    
         const response  = await  verify(token,c.env.JWT_SECRET);
      if(!response.id){
        c.status(403);
        return c.json({error : "unauthorized"})
      }
      c.set("userId",  response.id as string);
      await next()
    } catch (error) {
        c.status(403);
        return c.json({error : "unauthorized"})
    }
})


blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
        const body = await c.req.json();
        const {success} = createPostInput.safeParse(body);

        if(!success){
            c.status(411);
            return c.json({
                message: "inputs not correct"
            })
        }

        const authorId = c.get("userId");
 
       const post =  await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
         
    return c.json({
        id: post.id
    });
 })
   
 blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
        const body = await c.req.json();

        const {success} = updatePostInput.safeParse(body);

        if(!success){
            c.status(411);
            return c.json({
                message: "inputs not correct"
            })
        }

 
       const post =  await prisma.post.update({
        where:{
                id: body.id
        },
            data:{
                title: body.title,
                content: body.content,
            }
        })
         
    return c.json({
        id: post.id
    });
 })
  //pagination
  blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blogs = await prisma.post.findMany();

   return c.json({
    blogs
   })

 })
    
 blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const id = c.req.param('id');
 
       try {
        const post =  await prisma.post.findFirst({
             where: {
                 id
             }
         })
          
     return c.json({
        post
     });
       } catch (error) {
          c.status(411);
          return c.json({
            message: " error while fetching blog post"
          })
       }
 })


 

 export default blogRouter;