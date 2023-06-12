'use client';

import { findAllContents } from '@app/api/ApiContent';
import { AuthContext } from '@app/contexts/authContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { ContentCard } from './ContentCard';

const ContentCardList = ({ data, handleContentClick }) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((content) => (
        <ContentCard 
          key={content.id}
          content={content}
          handleContentClick={handleContentClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const router = useRouter();
  const { authState, isUserAuthenticated } = useContext(AuthContext);
  const [searchText, setSearchText] = useState('');
  const [contents, setContents] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const callApiFindAllContents = async () => {
      const response = await findAllContents(authState);

      setContents(response);
    }

    try {
      callApiFindAllContents();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className='feed'>
        <form className="relative w-full flex-center">
          <input 
            type="text"
            placeholder="Procure por uma Categoria ou Título"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>

        <ContentCardList 
          data={contents}
          handleContentClick={ () => {} }
        />

    </section>
  )
}

export default Feed