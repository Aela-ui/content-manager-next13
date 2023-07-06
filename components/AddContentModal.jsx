
import { Box, Modal } from "@mui/material";
import SelectComponent from "./SelectComponent";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@app/contexts/authContext";
import { editContentRobot, findAllRobots, findAllUserRobots } from "@app/api/ApiRobot";
import { getPermission } from "@utils/getPermission";
import AlertComponent from "./AlertComponent";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #fff',
    borderRadius: '10px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function AddContentModal({open, contentId, handleClose}) {
    const { authState, isUserAuthenticated } = useContext(AuthContext);
    const [robots, setRobots] = useState([]);
    const [robot, setRobot] = useState({});
    const [openPopUp, setOpenPopUp] = useState(false);
    const [message, setMessage] = useState("");
    const [popUpType, setPopUpType] = useState("");

    useEffect(() => {
        const callApiFindAllRobots = async() => {
            const body = await findAllRobots(authState);
            setRobots(body);
        }

        const callApiFindAllUserRobots = async() => {
            const body = await findAllUserRobots(authState, authState.user.id);
            setRobots(body);
        }

        try {
            if(getPermission(authState.user.role.permissions, "view-all-robots")) 
                callApiFindAllRobots();
            else 
                callApiFindAllUserRobots();
        } catch (error) {
            console.log(error);
        }
    }, [authState]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await editContentRobot(authState, robot.id, contentId);

        if(response?.status === 200) {
            setMessage("Conteúdo adicionado ao robô");
            setPopUpType("success");
        } else {
            console.log(response.message);
            setMessage("Erro ao adicionar conteúdo ao robô");
            setPopUpType("error");
        }
        setOpenPopUp(true);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >   
            <Box sx={{ ...style, width: 400 }}>
            {openPopUp ?
                <AlertComponent 
                    open={openPopUp} 
                    setOpen={setOpenPopUp}
                    message={message}
                    type={popUpType}
                />
                :null
            }
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-10 flex flex-col
                gap-7">
                <label>
                    <span className="font-satoshi font-semibold text-base indigo_gradient">
                        Adicionar Conteúdo ao Robô
                    </span>
                    <SelectComponent 
                        data={robots}
                        selected={robot}
                        setData={setRobot}
                        type="object"
                        fieldName="nickname"
                        disabled={false}
                    />
                </label>
                <div className="flex-between mx-13 mb-5 gap-4">
                    <button className="text-gray-500 text-sm" onClick={handleClose}>
                        Fechar
                    </button>
                    <button type="submit"
                        className="px-5 py-1.5 text-sm bg-indigo-500 text-white
                        rounded-full
                        border border-indigo-500
                        hover:bg-white hover:text-indigo-500"
                    >
                        Confirmar
                    </button>
                </div>
            </form>
            </Box>
      </Modal>
    );
  }