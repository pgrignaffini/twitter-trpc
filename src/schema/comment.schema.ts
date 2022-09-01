import z from 'zod';

export const createCommentSchema = z.object({
    text: z.string().min(5),
    postId: z.string().uuid(),
})


export const getSingleCommentSchema = z.object({
    commentId: z.string().uuid(),
})

export const getPostCommentsSchema = z.object({
    postId: z.string().uuid(),
})
