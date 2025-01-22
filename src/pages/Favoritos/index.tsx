import {
  IconButton,
  InputBase,
  List,
  Pagination,
  Paper,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { getFavorites } from "../../services/managerFavorite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Favoritos = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<any[]>([]);
  
  const itemsPerPage = 10;
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const filtered = favorites.filter(repo =>
      repo.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFavorites(filtered);
  };

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

    
  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar repositório"
          inputProps={{ "aria-label": "search google maps" }}
          value={searchQuery}
          onChange={handleSearch}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </IconButton>
      </Paper>
      <Stack spacing={2} alignItems={"center"}>
        <List style={{width: '100%'}}>
          {favorites.map((item, index) => (
            <Card
              key={index}
              id={item.id}
              repositoryName={item.owner.login}
              projectName={item.name}
              description={item.description || "Sem descrição"}
              language={item.language}
              stars={item.stargazers_count}
              forks={item.forks_count}
            />
          ))} 
        </List>
        <Pagination
          count={Math.ceil(favorites.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </>
  );
};

export default Favoritos;
