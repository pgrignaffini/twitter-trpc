import z from 'zod';

export const createPostSchema = z.object({
    text: z.string().min(2),
})

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;

export const getSinglePostSchema = z.object({
    postId: z.string().uuid(),
})