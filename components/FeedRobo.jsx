'use client';

import RoboCard from "./RoboCard";
import { findAllRobots, findAllUserRobots } from '@app/api/ApiRobot';
import { AuthContext } from '@app/contexts/authContext';
import { getPermission } from "@utils/getPermission";
import { useState, useEffect, useContext } from 'react';

const RobotCardList = ({ data }) => {
    return(
      <div className="mt-16 prompt_layout">
        {data.map((robot) => (
          <RoboCard 
            key={robot.id}
            robot={robot}
          />
        ))}
      </div>
    )
}

const FeedRobo = () => {
    const { authState, isUserAuthenticated } = useContext(AuthContext);
    const [rows, setRows] = useState([]);

    useEffect(() => {
      const callApiFindAllRobots = async() => {
          const body = await findAllRobots(authState);
          setRows(body);
      }

      const callApiFindAllUserRobots = async() => {
          const body = await findAllUserRobots(authState, authState.user.id);
          console.log(body);
          setRows(body);
      }

      try {
        console.log();
          if(getPermission(authState.user.role.permissions, "view-all-robots")) 
              callApiFindAllRobots();
          else 
              callApiFindAllUserRobots();
      } catch (error) {
          console.log(error);
      }
  }, [authState]);

    return (
        <>
            <h1 className="desc text_center">
                Edite
                <span className="indigo_gradient 
                text-center"> o seu Robô</span>
            </h1>
            <section className='feed'>
                <RobotCardList 
                    data={rows}
                />
            </section>
        </>
    )
}
  
export default FeedRobo