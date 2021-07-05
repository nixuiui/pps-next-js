import { useEffect } from "react";
import { logoutAccount } from "../../services/api/auth.api";

export default function Index() {

    useEffect(() => {
        logoutAccount()
    }, []);

    return null
}