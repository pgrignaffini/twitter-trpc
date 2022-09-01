import { createCommentSchema, getPostCommentsSchema, getSingleCommentSchema } from "../../schema/comment.schema"
import { createRouter } from "./context"
import * as trpc from "@trpc/server"

export const commentRouter = createRouter()
    .mutation('create-comment', {
        input: createCommentSchema,
        async resolve({ ctx, input }) {
            if (!ctx.session?.user) {
                new trpc.TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to create a comment",
                })
            }

            const comment = await ctx.prisma.comment.create({
                data: {
                    text: input.text,
                    user: {
                        connect: {
                            id: ctx.session?.user?.id,
                        }
                    },
                    post: {
                        connect: {
                            id: input.postId,
                        }
                    }
                }
            })

            return comment
        }
    })
    .query('comments', {
        resolve({ ctx }) {
            return ctx.prisma.comment.findMany({
                include: {
                    user: true,
                    post: true,
                }
            })
        }
    })
    .query('single-comment', {
        input: getSingleCommentSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.comment.findUnique({
                where: {
                    id: input.commentId
                },
                include: {
                    user: true,
                    post: true,
                }
            })
        }
    })
    .query('post-comments', {
        input: getPostCommentsSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.comment.findMany({
                where: {
                    postId: input.postId
                },
                include: {
                    user: true,
                }
            })
        }
    })