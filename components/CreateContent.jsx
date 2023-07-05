import Link from "next/link"
import MultipleSelect from "./MultipleSelect"
import SelectComponent from "./SelectComponent"
import { useContext, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthContext } from "@app/contexts/authContext"
import { findAllUsers } from "@app/api/ApiUser"
import { findAllCategories, findUserCategories } from "@app/api/ApiCategory"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { createContent, editContent, uploadContent } from "@app/api/ApiContent"
import AlertComponent from "./AlertComponent"
import { findContent } from "@app/api/ApiContent"
import { getPermission } from "@utils/getPermission"

export const CreateContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { authState, isUserAuthenticated } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState({
        id: authState.user.id,
        name: authState.user.name
    });
    const [model, setModel] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isPublic, setIsPublic] = useState(0);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [file, setFile] = useState();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [popUpType, setPopUpType] = useState("");

    useEffect(() => {
        if(!isUserAuthenticated()) router.push('/')
    }, []);
    
    useEffect(() => {
        const callApiFindAllCategories = async () => {
            const body = await findAllCategories(authState);
            setCategories(body);
        }

        const callApiFindUserCategories = async () => {
            const body = await findUserCategories(authState, authState.user.id);
            setCategories(body);
        }
        
        try {
            if(getPermission(authState.user.role.permissions, "create-own-contents"))
                callApiFindUserCategories();
            else
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

    useEffect(() => {
        const callApiFindContent = async () => {
            const {data} = await findContent(authState, searchParams.get('id'));
            console.log(data);
            const {title, description, model, isPublic, user, categories} = data
            setTitle(title);
            setDescription(description);
            setModel(model);
            setIsPublic(isPublic); 
            setUser(user);
            setSelectedCategories(categories.map(({category}) => category));
        }
        
        try { 
            if(searchParams.get('id'))
                callApiFindContent();
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

    const handleEdit = async (e) => {
        e.preventDefault();
        
        const response = await editContent(authState, title, description, model, user.id, isPublic, selectedCategories, searchParams.get('id'));
        if(response?.status === 200) {
            if(file) {
                const responseUpload = await uploadContent(authState, response.data.id, file);
                console.log(responseUpload);
            }
            setMessage("Conteúdo editado");
            setPopUpType("success");
        } else {
            setMessage("Erro ao editar conteúdo");
            setPopUpType("error");
            console.log(response.message);
        }
        setOpen(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await createContent(authState, title, description, model, user.id, isPublic, selectedCategories);

        if(response?.status === 201) {
            console.log("conteúdo criado");
            const responseUpload = await uploadContent(authState, response.data.id, file);
            console.log(responseUpload);
            setMessage("Novo conteúdo criado");
            setPopUpType("success");
            router.push('/');
        } else {
            setMessage("Erro ao criar conteúdo");
            setPopUpType("error");
            console.log(response.message);
        }
        setOpen(true);
    };
    return (
        <>
            <section className="w-full max-w-full flex-start flex-col">
                <h1 className="head_text text-left">
                {searchParams.get('id') ? (
                    <span className="indigo_gradient">Editar Conteúdo</span>
                ): (
                    <span className="indigo_gradient">Criar Conteúdo</span>
                )}
                </h1>

                <p className="desc text-left max-w-md">
                    Crie e compartilhe conteúdos incríveis!
                </p>

                <form onSubmit={searchParams.get('id') ? handleEdit: handleSubmit} className="w-full max-w-2xl mt-10 flex flex-col
                gap-7 glassmorphism">
                    <label>
                        {!searchParams.get('id') ? (
                            <span className="font-satoshi font-semibold text-base text-gray-700">
                            Novo Conteúdo
                            </span>
                        ): null}
                        <input 
                            onChange={(e) => setTitle(e.target.value)}
                            title="value"
                            value={title} 
                            className="form_input"
                            placeholder="Escreva o título aqui..."
                            required
                        >
                        </input >

                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
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
                        <SelectComponent
                            data={users} 
                            selected={user} 
                            setData={setUser} 
                            type="object" 
                            fieldName="name"
                            disabled={getPermission(authState.user.role.permissions, "create-own-contents")}
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
                            Categoria {` `}
                            <span className="font-normal">
                                (Educação, Autismo, Psicologia, Saúde...)
                            </span>
                        </span>
                        <MultipleSelect 
                            data={categories} 
                            selected={selectedCategories} 
                            setData={setSelectedCategories} 
                        />
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
                            onChange={handleFileChange}
                            >
                        </input >
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
            {open ?
                <AlertComponent 
                    open={open} 
                    setOpen={setOpen}
                    message={message}
                    type={popUpType}
                />
                :null
            }
        </>
    )
}