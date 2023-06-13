import Link from "next/link"
import MultipleSelect from "./MultipleSelect"
import SelectComponent from "./SelectComponent"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@app/contexts/authContext"
import { findAllUsers } from "@app/api/ApiUser"
import { findAllCategories } from "@app/api/ApiCategory"
import { createContent, findAllContents, uploadContent } from "@app/api/ApiContent"
import { TextField } from "@mui/material";
import { createRobot } from "@app/api/ApiRobot"
import AlertComponent from "./AlertComponent"

export const CreateRobo = () => {
    const router = useRouter();
    const { authState, isUserAuthenticated } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [mac, setMac] = useState('');
    const [user, setUser] = useState({});
    const [content, setContent] = useState({});
    const [model, setModel] = useState('');
    const [contents, setContents] = useState([]);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [popUpType, setPopUpType] = useState("");

    useEffect(() => {
        if(!isUserAuthenticated()) router.push('/')
    }, []);
    
    useEffect(() => {
        const callApiFindAllContents = async () => {
            const body = await findAllContents(authState);
            setContents(body);
        }
        
        try {
            callApiFindAllContents();
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
        console.log(name, mac, model, users, content.id);
        const response = await createRobot(authState, name, mac, model, users, content.id);

        if(response?.status === 201) {
            setMessage("Novo robô criado");
            setPopUpType("success");
        } else {
            console.log(response.message);
            setMessage("Erro ao criar robô");
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
                    <span className="indigo_gradient">Adicionar Robô</span>
                </h1>

                <p className="desc text-left max-w-md">
                    Adicione um novo robô!
                </p>

                <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-10 flex flex-col
                gap-7 glassmorphism">
                    <label>
                        <TextField 
                            variant="standard" 
                            label="Nome" 
                            id="outlined-basic" 
                            onChange={(e) => setName(e.target.value)} 
                            type="object"
                        />
                    </label>

                    <label>
                        <TextField 
                            variant="standard" 
                            label="Mac" 
                            id="outlined-basic" 
                            type="object"
                            onChange={(e) => setMac(e.target.value)} 
                        />
                    </label>

                    <label>
                        <span className="font-satoshi font-semibold text-base text-gray-700">
                            Modelo
                        </span>
                        <SelectComponent data={['Beo', 'Outro']} selected={model} setData={setModel}/>
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
                        <MultipleSelect data={users} setData={setUser} />
                    </label>

                    <div className="flex-end mx-13 mb-5 gap-4">
                        <Link href="/" className="text-gray-500 text-sm">
                            Cancelar
                        </Link>
                            
                        <button type="submit"
                            className="px-5 py-1.5 text-sm bg-indigo-500 text-white
                            rounded-full
                            border border-indigo-500
                            hover:bg-white hover:text-indigo-500"
                        >
                            Adicionar
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}