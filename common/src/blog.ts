import z from 'zod'

export const createBlogInput = z.object({
  title : z.string(),
  content : z.string(),
  authorId : z.number(),
});

export const updateBlogInput = z.object({
  title : z.string(),
  content : z.string(),
  id : z.number(),
});

export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>