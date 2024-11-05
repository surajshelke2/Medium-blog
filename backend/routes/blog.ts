import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import z from "surajshelke02";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };

  Variables: {
    userId: string;
  };
}>();

blogRouter.use(async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt;
  const payload = await verify(token, c.env.JWT_SECRET);
  try {
    if (!payload || typeof payload.id !== "string") {
      return c.json({ error: "Unauthorized" }, 401);
    }
    c.set("userId", payload.id);

    await next();
  } catch (error) {
    console.log("Error in middleware", error);
  }
});




blogRouter.post("/", async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");

    let body = await c.req.json();
    const {title ,description, content} = body;

    const { success } = z.blogPost.safeParse(body);

    if (!success) {
      c.status(403);
      return c.json({
        message: "Invalid Data !!",
      });
    }

    if (!title || !content) {
      return c.status(400).json({
        message: "Title, content, and description are required",
      });
    }

    const blog = await prisma.post.create({
      data: {
        title:title,
        content:content,
        published:true,
        description,
        authorId: userId,
      },
    });

    console.log(blog);

    return c.json({
      id: blog.id,
    });
  } catch (error: any) {
    c.status(403);

    return c.json({
      message: error || "Unauthorized",
    });
  }
});

//

blogRouter.put("/", async (c: any) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();

    const { success } = z.updatePost.safeParse(body);

    if (!success) {
      c.status(403);
      return c.json({
        message: "Invalid Data !!",
      });
    }
    console.log(body);
    if (!body) {
      return c.res.send(400, "Data Not Found !!");
    }

    const update = await prisma.post.update({
      where: { id: body.id, authorId: userId },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json(update);
  } catch (error) {
    return c.res.send(
      409,
      "Conflict !!, Post not found or you are trying to update someone else's post"
    );
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log(id);
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      // createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  console.log(post);
  return c.json(post);
});
