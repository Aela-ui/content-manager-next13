import Link from "next/link"
import MultipleSelect from "./MultipleSelect"
import SelectComponent from "./SelectComponent"
import { useContext, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthContext } from "@app/contexts/authContext"
import { findAllUsers } from "@app/api/ApiUser"
import { findAllContents, findAllUserContents } from "@app/api/ApiContent"
import { TextField } from "@mui/material";
import { createRobot, editRobot, findAllUserRobots, findOneRobot } from "@app/api/ApiRobot"
import AlertComponent from "./AlertComponent"
import { getPermission } from "@utils/getPermission"

export const CreateRobot = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { authState } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [mac, setMac] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [content, setContent] = useState({});
    const [model, setModel] = useState('');
    const [contents, setContents] = useState([]);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [popUpType, setPopUpType] = useState("");

    useEffect(() => {
        const callApiFindAllUserRobots = async () => {
            const response = await findAllUserRobots(authState, authState.user.id);
            if(!response.some(item => item.id === +searchParams.get('id')))
                router.push('/listing-robot');
        }
      
        try {
            if(!getPermission(authState.user.role.permissions, "view-all-robots"))
                callApiFindAllUserRobots();
        } catch (error) {
            console.log(error);
        }
    }, [searchParams, authState]);

    useEffect(() => {
        const callApiFindOneRobot = async () => {
            const {nickname, model, mac, content, users } = await findOneRobot(authState, searchParams.get('id'));
            setName(nickname);
            setModel(model);
            setMac(mac);
            setContent(content);
            setSelectedUsers(users.map(({user}) => user));
        }
        
        try {
            if(searchParams.get('id'))
                callApiFindOneRobot();
        } catch (error) {
            console.log(error);
        }
    }, [authState]);
    
    useEffect(() => {
        const callApiFindAllContents = async () => {
          const response = await findAllContents(authState);
          setContents(response);
        }
    
        const callApiFindAllUserContents = async () => {
          const response = await findAllUserContents(authState, authState.user.id);
          setContents(response);
        }
    
    
        try {
          if(getPermission(authState.user.role.permissions, "view-all-contents"))
            callApiFindAllContents();
          else
            callApiFindAllUserContents();
        } catch (error) {
          console.log(error);
        }
      }, [authState]);
    
    useEffect(() => {
        const callApiFindAllUsers = async () => {
            const body = await findAllUsers(authState);
            setUsers(body);
        }
        
        try {
            callApiFindAllUsers();
        } catch (error) {
            console.log(error);
        }
    }, [authState]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createRobot(authState, name, mac, model, selectedUsers, content.id);

        if(response?.status === 201) {
            setMessage("Novo robô criado");
            setPopUpType("success");
            router.push('/listing-robot');
        } else {
            console.log(response.message);
            setMessage("Erro ao criar robô");
            setPopUpType("error");
        }
        setOpen(true);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const response = await editRobot(authState, searchParams.get('id'), name, mac, model, selectedUsers, content.id);

        if(response?.status === 200) {
            setMessage("Robô editado");
            setPopUpType("success");
            router.push('/listing-robot');
        } else {
            console.log(response.message);
            setMessage("Erro ao editar robô");
            setPopUpType("error");
        }
        setOpen(true);
    };
    return (
        <>
            {open ?
                <AlertComponent 
                    open={open} 
                    setOpen={setOpen}
                    message={message}
                    type={popUpType}
                />
                :null
            }
            <section className="w-full max-w-full flex-start flex-col">
                <h1 className="head_text text-left">
                    {searchParams.get('id') ? (
                        <span className="indigo_gradient">Editar Robô</span>
                    ): (
                        <span className="indigo_gradient">Criar Robô</span>
                    )}
                </h1>

                <p className="desc text-left max-w-md">
                    Adicione um novo robô!
                </p>

                <form onSubmit={searchParams.get('id') ? handleEdit: handleSubmit} className="w-full max-w-2xl mt-10 flex flex-col
                gap-7 glassmorphism">
                    <label>
                        <input 
                            onChange={(e) => setName(e.target.value)}
                            title="value"
                            value={name} 
                            className="form_input"
                            placeholder="Insira o nome do robô"
                            required
                        >
                        </input >
                    </label>
                    {getPermission(authState.user.role.permissions, "edit-all-robots") && (
                        <label>
                            <input 
                                onChange={(e) => setMac(e.target.value)}
                                title="value"
                                value={mac} 
                                className="form_input"
                                placeholder="Informe o endereço MAC"
                                required
                            >
                            </input >
                        </label>
                    )}

                    <label>
                        <span className="font-satoshi font-semibold text-base text-gray-700">
                            Modelo
                        </span>
                        <SelectComponent data={['Beo', 'Outro']} selected={model} setData={setModel} disabled={!getPermission(authState.user.role.permissions, "edit-all-robots")}/>
                    </label>

                    <label>
                        <span className="font-satoshi font-semibold text-base text-gray-700">
                            Conteúdo
                        </span>
                        <SelectComponent 
                            data={contents} 
                            selected={content} 
                            setData={setContent}
                            type="object"
                            fieldName="title"
                        />
                    </label>

                    <label>
                        <span className="font-satoshi font-semibold text-base text-gray-700">
                            Usuários
                        </span>
                        <MultipleSelect data={users} selected={selectedUsers} setData={setSelectedUsers} disabled={!getPermission(authState.user.role.permissions, "edit-all-robots")}/>
                    </label>

                    <div className="flex-end mx-13 mb-5 gap-4">
                        <Link href="/" className="text-gray-500 text-sm">
                            Cancelar
                        </Link>
                            
                        {searchParams.get('id') ? (
                            <button 
                                type="submit"
                                className="px-5 py-1.5 text-sm bg-indigo-500 text-white
                                rounded-full
                                border border-indigo-500
                                hover:bg-white hover:text-indigo-500"
                            >
                                Editar
                            </button>
                        ): (
                            <button 
                                type="submit"
                                className="px-5 py-1.5 text-sm bg-indigo-500 text-white
                                rounded-full
                                border border-indigo-500
                                hover:bg-white hover:text-indigo-500"
                            >
                                Criar
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </>
    )
}