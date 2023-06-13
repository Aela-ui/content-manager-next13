import Link from "next/link"
import MultipleSelect from "./MultipleSelect"
import SelectComponent from "./SelectComponent"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@app/contexts/authContext"
import { findAllUsers } from "@app/api/ApiUser"
import { findAllCategories } from "@app/api/ApiCategory"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { createContent, uploadContent } from "@app/api/ApiContent"

export const CreateContent = () => {
    const router = useRouter();
    const { authState, isUserAuthenticated } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState({});
    const [model, setModel] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isPublic, setIsPublic] = useState(0);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [file, setFile] = useState();

    useEffect(() => {
        if(!isUserAuthenticated()) router.push('/')
    }, []);
    
    useEffect(() => {
        const callApiFindAllCategories = async () => {
            const body = await findAllCategories(authState);
            setCategories(body);
        }
        
        try {
            callApiFindAllCategories();
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
    
    const handleChange = (event, newAlignment) => {
        setIsPublic(newAlignment);
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await createContent(authState, title, description, model, user.id, isPublic, selectedCategories);

        if(response?.status === 201) {
            console.log("conteúdo criado");
            const responseUpload = await uploadContent(authState, response.data.id, file);
            console.log(responseUpload);
        } else {
            console.log(response.message);
        }
    };
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="indigo_gradient">Criar Conteúdo</span>
            </h1>

            <p className="desc text-left max-w-md">
                Crie e compartilhe conteúdos incríveis!
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-10 flex flex-col
            gap-7 glassmorphism">
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Novo Conteúdo
                    </span>

                    <input 
                        onChange={(e) => setTitle(e.target.value)}
                        title="value" 
                        className="form_input"
                        placeholder="Escreva o título aqui..."
                        required
                    >
                    </input >

                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Escreva sua descrição aqui..."
                        required
                        className="form_textarea"
                    >
                    </textarea>
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Usuário
                    </span>
                    <SelectComponent data={users} selected={user} setData={setUser} type="object"/>
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Modelo
                    </span>
                    <SelectComponent data={['Beo', 'Outro']} selected={model} setData={setModel}/>
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Categoria {` `}
                        <span className="font-normal">
                            (Educação, Autismo, Psicologia, Saúde...)
                        </span>
                    </span>
                    <MultipleSelect data={categories} setData={setSelectedCategories} />
                </label>

                <label>
                <ToggleButtonGroup
                    color="primary"
                    value={isPublic}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value={1}>Público</ToggleButton>
                    <ToggleButton value={0}>Privado</ToggleButton>
                </ToggleButtonGroup>
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Selecione o Arquivo
                    </span>
                    <input 
                        type="file"
                        className="form_input"
                        required
                        onChange={handleFileChange}
                        >
                    </input >
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
                        Criar
                    </button>
                </div>
            </form>
        </section>
    )
}