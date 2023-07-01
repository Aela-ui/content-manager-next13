'use client';

import { findAllContents } from '@app/api/ApiContent';
import { AuthContext } from '@app/contexts/authContext';
import { useState, useEffect, useContext } from 'react';
import { ContentCard } from './ContentCard';

const ContentCardList = ({ data }) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((content) => (
        <ContentCard 
          key={content.id}
          content={content}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const { authState, isUserAuthenticated } = useContext(AuthContext);
  const [searchText, setSearchText] = useState('');
  const [contents, setContents] = useState([]);
  const [rows, setRows] = useState([]);

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
    if(searchText === '') setRows(contents)
    else{
      const filteredContents = contents.filter(({title, categories}) => {
        const contentTitle = title ? title.toLowerCase() : '';
        const categoriesNames = categories.filter(({category}) => {
          return category.name.toLowerCase().includes(searchText)
        });
        
        return contentTitle.includes(searchText) || categoriesNames.length > 0;
      });
      setRows(filteredContents);
    }
  }

  useEffect(() => {
    const callApiFindAllContents = async () => {
      const response = await findAllContents(authState);

      setContents(response);
      setRows(response);
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
            placeholder="Pesquise por Categoria ou Título"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>

        <ContentCardList 
          data={rows}
        />

    </section>
  )
}

export default Feed