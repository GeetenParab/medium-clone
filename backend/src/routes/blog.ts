import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from "@geeten/medium-common";
import { createPrismaClient } from "../db";

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
   
 blogRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
        const body = await c.req.json();
        const id = c.req.param('id');

        const {success} = updatePostInput.safeParse(body);

        if(!success){
            c.status(411);
            return c.json({
                message: "inputs not correct"
            })
        }

 
       const post =  await prisma.post.update({
        where:{
                id
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
    }).$extends(withAccelerate());

    try {
        const page = Number(c.req.query('page')) || 1; // Default page is 1
        const limit = Number(c.req.query('limit')) || 5; // Default limit is 5
        const skip = (page - 1) * limit;

        // Fetch paginated blogs
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            skip: skip,
            take: limit,
        });

        // Fetch total blog count
        const totalBlogs = await prisma.post.count();
        const totalPages = Math.ceil(totalBlogs / limit);

        // Return paginated response
        return c.json({
            blogs,
            currentPage: page,
            totalPages,
            totalBlogs,
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return c.json({ error: "Failed to fetch blogs." }, 500);
    } finally {
        await prisma.$disconnect(); // Ensure Prisma client is disconnected
    }
});

    
 blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const id = c.req.param('id');
 
       try {
        const post =  await prisma.post.findFirst({
             where: {
                 id
             },
             select:{
                id:true,
                title:true,
                content:true,
                createdAt:true,
                author:{
                   select:{
                    name:true,
                    id:true,
                   }
                }
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


 blogRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  


    const id = c.req.param('id');
 
       try {
          await prisma.post.delete({
             where: {
                 id
             }
         })
          
     return c.json({
        message: "succeccfully deleted"
     });
       } catch (error) {
          c.status(411);
          return c.json({
            message: " error while deleting blog post"
          })
       }
 })



 

 export default blogRouter;