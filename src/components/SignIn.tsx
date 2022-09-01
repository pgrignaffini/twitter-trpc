import { signIn, signOut, useSession } from "next-auth/react";

function SignIn() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <main>Loading...</main>;
    }

    return (
        <main>
            {session ? (
                <div>
                    <p>
                        hi {session.user?.name}
                    </p>

                    <button onClick={() => signOut()}>Logout</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => signIn("discord")}>Login with Discord</button>
                </div>
            )}
        </main>
    );
}

export default SignIn
