'use client';
import FeedRobo from "@components/FeedRobo"
import withAuth from "@components/PrivateRoute"

const ListingRobot = () => {
  return (
    <div>
        <FeedRobo />
    </div>
  )
}

export default withAuth(ListingRobot)