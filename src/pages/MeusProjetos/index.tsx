import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Center, Container, Descricao, Icon, Title } from './styles';
import Card from '../../components/Card';
import { Contributor, RepoDetails, User } from '../../utils/types';
import { getAllRepositoryUser, getUserDetails } from '../../services/api';
import { ClipLoader } from 'react-spinners';


const MeusProjetos = () => {
  const { id } = useParams<{ id: any }>();
  const [repos, setRepos] = useState<RepoDetails[]>([]);
  const [user, setUser] = useState<User>({
    avatar_url: '',
    login: '',
  });
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositoryData = async () => {
      setLoading(true);
      try {
        const repoData = await getUserDetails(id);
        setUser(repoData);
        const repoDataDetail = await getAllRepositoryUser(repoData.login);
        setRepos(repoDataDetail);

      } catch (err) {
        setError('Erro ao carregar os detalhes:' + err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchRepositoryData();
    }, [id]);


    if (loading) {
        return <Center style={{marginTop: 50}}><ClipLoader size={50} color="#c74898" /></Center> 
      }

  if (error) {
    return <div>{error}</div>;
  }

  if (!repos) {
    return <div>Repositório não encontrado.</div>;
  }
  
  return (
    <div>
      <Container>
        <Box>
          <Avatar src={user.avatar_url}></Avatar>
          <Center>
            <Title>{user.login}</Title>
          </Center>
        </Box>
        <Box style={{width: '60%'}}>
          {repos.map((item, index) => (       
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
        </Box>
      </Container>
      <Box>
        <Title>Contribuidores: </Title>
        <Center>
            {contributors.length <= 0? (
                <Descricao>Projeto sem contribuição</Descricao>
            ) : (
                contributors.map((contributor) => (
                    <Box key={contributor.login}>
                      <Icon src={contributor.avatar_url}></Icon>
                      <Title>{contributor.login}</Title>
                    </Box>
                ))
            )}
        </Center>
      </Box>
    </div>
  );
};

export default MeusProjetos;