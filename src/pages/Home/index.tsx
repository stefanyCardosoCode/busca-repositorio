import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { IconButton, InputBase, List, Pagination, Paper, Stack } from "@mui/material";
import { RepoDetails } from "../../utils/types";
import { getAllRepositoryDetails, getAllRepositorys } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { Center } from "../Detalhe/styles";

const Home = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRepos, setFilteredRepos] = useState<RepoDetails[]>([]);
  const [repos, setRepos] = useState<RepoDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const fetchRepositoryData = async () => {
    setLoading(true);

    try {
      const repoData = await getAllRepositorys();

      const repoDetailsPromises = repoData.map((repo: any) => {
        return getAllRepositoryDetails(repo.owner.login, repo.name);
      });

      const repoDetails = await Promise.all(repoDetailsPromises);
      setRepos(repoDetails);
      setFilteredRepos(repoDetails);

    } catch (err) {
      setError('Erro ao carregar os detalhes:' + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositoryData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const filtered = repos.filter(repo =>
      repo.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredRepos(filtered);
  };

  if (loading) {
    return <Center style={{marginTop: 50}}><ClipLoader size={50} color="#c74898" /></Center> 
  }

  if (error) {
    return <div>{error}</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = filteredRepos.slice(startIndex, endIndex);

  return (
    <div>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', marginTop: 5 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar repositório"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={searchQuery}
          onChange={handleSearch}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </IconButton>
      </Paper>
      <Stack spacing={2} alignItems={'center'}>
        <List>
          {visibleItems.map((item, index) => (
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
          count={Math.ceil(repos.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary" />
      </Stack>
      
    </div>
  );
};

export default Home;