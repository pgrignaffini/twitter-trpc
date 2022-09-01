import { createPostSchema, getSinglePostSchema } from "../../schema/post.schema"
import { createRouter } from "./context"
import * as trpc from "@trpc/server"

export const postRouter = createRouter()
    .mutation('create-post', {
        input: createPostSchema,
        async resolve({ ctx, input }) {
            if (!ctx.session?.user) {
                new trpc.TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to create a post",
                })
            }

            const post = await ctx.prisma.post.create({
                data: {
                    ...input,
                    user: {
                        connect: {
                            id: ctx.session?.user?.id,
                        }
                    }
                }
            })

            return post
        }
    })
    .query('posts', {
        resolve({ ctx }) {
            return ctx.prisma.post.findMany({
                include: {
                    user: true,
                }
            })
        }
    })
    .query('single-post', {
        input: getSinglePostSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.post.findUnique({
                where: {
                    id: input.postId
                },
                include: {
                    user: true,
                }
            })
        }
    })