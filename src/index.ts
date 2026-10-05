import { Elysia, t } from "elysia";
import { db, users } from "./db";

const app = new Elysia()
  .get("/", () => ({
    message: "Welcome to Elysia + Drizzle + MySQL API",
    status: "ok",
  }))
  .get("/health", () => ({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }))
  .group("/users", (app) =>
    app
      .get("/", async () => {
        try {
          const allUsers = await db.select().from(users);
          return { success: true, data: allUsers };
        } catch (error) {
          return {
            success: false,
            message: "Database query error",
            error: (error as Error).message,
          };
        }
      })
      .post(
        "/",
        async ({ body, set }) => {
          try {
            const result = await db.insert(users).values({
              name: body.name,
              email: body.email,
            });
            set.status = 201;
            return {
              success: true,
              message: "User created successfully",
              data: {
                id: result[0].insertId,
                name: body.name,
                email: body.email,
              },
            };
          } catch (error) {
            set.status = 500;
            return {
              success: false,
              message: "Failed to create user",
              error: (error as Error).message,
            };
          }
        },
        {
          body: t.Object({
            name: t.String(),
            email: t.String(),
          }),
        }
      )
  )
  .listen(process.env.PORT || 3000);

console.log(
  `🚀 Server is running at http://${app.server?.hostname}:${app.server?.port}`
);
