'use client';
import { useState } from 'react'
import Form from '@components/Form';

const CreateContent = () => {
    const [submitting, setSubmitting] = useState(false);
    const [content, setContent] = useState({
        title: '',
        description: '',
        categoria: '',
        file: '',
        userId: '',
    });

    const createContent = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try{
            const response = await fetch('', {
                method: 'POST',
                body: JSON.stringify({
                    title: content.title,
                    description: content.description,
                    categoria: content.categoria,
                    userId: session?.user.id,
                    file: content.file,
                })
            }) 

            if(response.ok){
                router.push('/');
            }
                
        } catch (error) {
            console.log(error);
        } finally{
            setSubmitting(false);
        }
    }

    return (
        <Form 
            type="Criar"
            content={content}
            setContent={setContent}
            submitting={submitting}
            handleSubmit={createContent}
        />
    )
}

export default CreateContent