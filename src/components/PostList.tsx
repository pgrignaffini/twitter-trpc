import { trpc } from "../utils/trpc";

function PostList() {
    const { data: posts, isLoading } = trpc.useQuery(["post.posts"]);

    if (isLoading) return <div>Fetching messages...</div>;

    return (
        <div className="flex flex-col gap-4">
            {posts?.map((post, index) => {
                return (
                    <div key={index}>
                        <span>{post.text}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default PostList
