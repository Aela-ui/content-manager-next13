'use client';

import { findAllContents, findAllUserContents } from '@app/api/ApiContent';
import { AuthContext } from '@app/contexts/authContext';
import { useState, useEffect, useContext } from 'react';
import ContentCard from './ContentCard';
import { getPermission } from '@utils/getPermission';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

const ContentCardList = ({ data, updated, setUpdated }) => {
  return(
    <>
      {data.map((content) => (
        <ContentCard 
          key={content.id}
          content={content}
          updated={updated}
          setUpdated={setUpdated}
        />
      ))}
    </>
  )
}

const Feed = () => {
  const { authState, isUserAuthenticated } = useContext(AuthContext);
  const [searchText, setSearchText] = useState('');
  const [contents, setContents] = useState([]);
  const [rows, setRows] = useState([]);
  const [updated, setUpdated] = useState(false);

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

    const callApiFindAllUserContents = async () => {
      const response = await findAllUserContents(authState, authState.user.id);

      setContents(response);
      setRows(response);
    }


    try {
      if(getPermission(authState.user.role.permissions, "view-all-contents"))
        callApiFindAllContents();
      else
        callApiFindAllUserContents();
    } catch (error) {
      console.log(error);
    }
  }, [updated]);

  return (
    <>
      <section className='feed'>
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Pesquise por Categoria ou Título"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer" />
        </form>
      </section>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: "auto",
          width: "fit-content",
          '& > :not(style)': {
            m: 4,
            width: 300,
            p:2
          }
        }}>

            <ContentCardList
              data={rows}
              updated={updated}
              setUpdated={setUpdated} />
        </Box>
    </>        
  )
}

export default Feed