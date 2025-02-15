import { signOut } from "@/auth";

const SettingsPage = () => {
    return (
        <div>
            <h1>Settings Page</h1>
            <p>This is the setting page content.</p>
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