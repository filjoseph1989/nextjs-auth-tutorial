import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
    const session = await auth();

    return (
        <div>
            <h1>Settings Page</h1>
            <p>This is the setting page content.</p>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server";
                return signOut();
            }}>
                <button type="submit">Sign Out</button>
            </form>
        </div>
    );
};

export default SettingsPage;