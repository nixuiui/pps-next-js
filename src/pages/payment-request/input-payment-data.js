import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Page = dynamic(() => import('../../components/pages/payment-request/input-data/input-data-page'), {
    loading: () => null,
    ssr: false,
});

export default function Index() {

    const router = useRouter()

    useEffect(() => {
    }, []);

    return (
        <Page />
    )
}