import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@geeten/medium-common";



const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET : string
	}
}>();


userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

      const body = await c.req.json();
      const {success} = signupInput.safeParse(body);

      if(!success){
        c.status(411);
        return c.json({
            message:"inputs not correct"
        })
      }
    
      const userExist = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });
  
    if (userExist) {
        c.status(403);
        return c.json({ error: "user already exist" });
    }
  
   const  user =    await prisma.user.create({
        data:{
          email : body.email,
          password:body.password,
         name : body.name
        }
      })


      const jwt =  await sign({id: user.id},c.env.JWT_SECRET)

 return c.json({
    jwt,
    user

 });
})



userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL	,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);

      if(!success){
        c.status(411);
        return c.json({
            message:"inputs not correct"
        })
      }
      
  const user = await prisma.user.findUnique({
      where: {
          email: body.email
      }
  });

  if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  
  return c.json({
    jwt,
    user

 });
})

export default userRouter;