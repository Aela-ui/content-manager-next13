'use client';

import RoboCard from "./RoboCard";
import { findAllRobots } from '@app/api/ApiRobot';
import { AuthContext } from '@app/contexts/authContext';
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
        const callApiFindAllRobots = async () => {
          const response = await findAllRobots(authState);
          setRows(response);
        }
    
        try {
          callApiFindAllRobots();
        } catch (error) {
          console.log(error);
        }
    }, []);

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