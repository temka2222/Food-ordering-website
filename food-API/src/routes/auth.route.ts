export const authRouter = Router()
  .get("/me", authenticationMiddleware, getMe)
  .post("/signin", signIn)
  .post("/signup", signUp);
