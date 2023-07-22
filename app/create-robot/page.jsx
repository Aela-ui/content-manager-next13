"use client";
import { CreateRobot } from "@components/CreateRobot"
import withAuth from "@components/PrivateRoute";

const CreateRobotPage = () => {
    return (
        <CreateRobot />
    )
}

export default withAuth(CreateRobotPage)