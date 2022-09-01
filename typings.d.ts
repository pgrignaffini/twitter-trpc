export type PostWithUser = Prisma.PostGetPayload<{
    include: { user: true }
}>