import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { middleware } from "../middleware/authentication";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

middleware(blogRouter);
blogRouter.get("/:id", async (c: any) => {
  const id = c.req.param("id");
  console.log(id);

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!blog) {
      throw "Blog is not found ";
    }

    return c.res.json(200, blog);
  } catch (error: any) {
    return c.res.send(500, error.message || error);
  }
});

blogRouter.post("/", async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    let body = await c.req.json();
    if (!body) return c.res.send(400, "Body should be JSON");

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: body.authorId,
      },
    });

    return c.res.json(201, blog);
  } catch (error: any) {
    console.log("Error in create Blog : ", error);
    return c.res.send(500, error.message || error);
  }
});

blogRouter.put("/", (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = c.req.json();
    if (!body) {
      return c.res.send(400, "Data Not Found !!");
    }

    return prisma.post.update({
      where: { id: body.id, authorId: body.authorId },
      data: {
        title: body.title,
        content: body.content,
      },
    });
  } catch (error) {
    return c.res.send(
      409,
      "Conflict !!, Post not found or you are trying to update someone else's post"
    );
  }
});
