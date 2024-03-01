import jwt from "@tsndr/cloudflare-worker-jwt";
export function middleware(app:any){

    app.use("/api/v1/blog/*", async (c: any, next: any) => {
    const header = c.req.headers("authorization") || "";
  
    const token = header.split(" ")[1];
  
    const response = await jwt.verify(token, c.env.JWT_SECRET);
  
    if (response) {
      next();
    } else {
      return c.status(403).json({ message: "Invalid Token" });
    }
  });

}
