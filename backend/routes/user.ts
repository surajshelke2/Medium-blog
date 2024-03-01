import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import jwt from "@tsndr/cloudflare-worker-jwt";

export   const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();
  

  userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
        },
      });
      const token = await jwt.sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ token });
    } catch (e) {
      c.status(403);
      return c.json({ error: "error while signing up" });
    }
  });
  

  userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
  
      if (!user) {
        throw "User not found";
      }
  
      const token = await jwt.sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ token });
    } catch (error) {
      return c.text("Wrong password or username");
    }
  
    return c.text("signin route");
  });