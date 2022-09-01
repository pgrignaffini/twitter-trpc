import PostList from "../components/PostList"
import SignIn from "../components/SignIn"
import Tweetbox from "../components/Tweetbox"


function TestPage() {
    return (
        <div>
            <SignIn />
            <Tweetbox />
            <PostList />
        </div>
    )
}

export default TestPage
