import { GlobalLoader } from "./GlobalLoader";
import Profile from "./profile/Profile";

export default function Header() {
    return (
        <header>
            <GlobalLoader />
            <Profile />
        </header>
    );
}
