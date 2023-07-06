'use client';

import RoboCard from "./RoboCard";
import { findAllRobots, findAllUserRobots } from '@app/api/ApiRobot';
import { AuthContext } from '@app/contexts/authContext';
import { getPermission } from "@utils/getPermission";
import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';

const RobotCardList = ({ data }) => {
    return(
      <>
        {data.map((robot) => (
          <RoboCard 
            key={robot.id}
            robot={robot}
          />
        ))}
      </>
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
          <section>
            <center>
              <h1 className="desc text_center mb-5">
                Edite
                <span className="indigo_gradient 
                text-center"> o seu Robô</span>
              </h1>
            </center>
          </section>

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: "auto",
            width: "fit-content",
            '& > :not(style)': {
              m: 2,
              width: 250,
              p:1
            }
          }}>
            <RobotCardList 
              data={rows}
            />
          </Box>
        
          
        </>
    )
}
  
export default FeedRobo