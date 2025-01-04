import { z } from "zod"

 export const signUpInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
  })

export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })

export const createBlogInput = z.object({
    title: z.string(),
    body: z.string(),
})

export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string(),
    body: z.string(),
})

  export type SignInInput = z.infer<typeof signInInput>
  export type SignUpInput = z.infer<typeof signUpInput>
  export type CreateBlogInput = z.infer<typeof createBlogInput>
  export type UpdateBlogInput = z.infer<typeof createBlogInput>


