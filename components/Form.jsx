import Link from "next/link"
import MultipleSelect from "./MultipleSelect"

const Form = ({ 
    type, content, setContent, submitting, handleSubmit, }) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="indigo_gradient">{type} Conteúdo</span>
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
                        onChange={(e) => setContent({ ...content,
                        title: e.target.value})}
                        title="value" 
                        className="form_input"
                        placeholder="Escreva o título aqui..."
                        required
                    >
                    </input >

                    <textarea
                        onChange={(e) => setContent({ ...content,
                        description: e.target.value})}
                        placeholder="Escreva sua descrição aqui..."
                        required
                        className="form_textarea"
                    >
                    </textarea>
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Categoria {` `}
                        <span className="font-normal">
                            (Educação, Autismo, Psicologia, Saúde...)
                        </span>
                    </span>
                    <MultipleSelect />
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Selecione o Arquivo
                    </span>
                    <input 
                        type="file"
                        onChange={(e) => setContent({ ...content,
                        file: e.target.value})}
                        className="form_input"
                        required
                        >
                    </input >
                </label>

                <div className="flex-end mx-13 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancelar
                    </Link>
                        
                    <button type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm bg-indigo-500 text-white
                        rounded-full
                        border border-indigo-500
                        hover:bg-white hover:text-indigo-500"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form