"use client";
import { CreateContent } from "@components/CreateContent"
import withAuth from "@components/PrivateRoute";

const CreateContentPage = () => {
    return (
        <CreateContent />
    )
}

export default withAuth(CreateContentPage)