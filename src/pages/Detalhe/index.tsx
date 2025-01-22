import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Center,
  Container,
  Descricao,
  Display,
  DotColor,
  Favorite,
  Icon,
  Text,
  Title,
} from "./styles";
import { formatDate } from "../../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Contributor, RepoDetails } from "../../utils/types";
import {
  addFavorite,
  isFavorite,
  removeFavorite,
} from "../../services/managerFavorite";
import {
  getRepositoryContributors,
  getRepositoryDetails,
} from "../../services/api";
import { ClipLoader } from "react-spinners";

const Detail = () => {
  const { id } = useParams<{ id: any}>();
  const [repo, setRepo] = useState<RepoDetails | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorited, setFavorited] = useState(isFavorite(id));

  const fetchRepositoryData = async () => {
    setLoading(true);

    try {
      const repoData = await getRepositoryDetails(id);
      setRepo(repoData);

      const contribuData = await getRepositoryContributors(id);
      setContributors(contribuData);
    } catch (err) {
      setError("Erro ao carregar os detalhes:" + err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if(!repo) return;
    if (favorited) {
      removeFavorite(id);
    } else {
      addFavorite({ id, name: repo.projectName, owner: { login: repo.repositoryName }, description: repo.description, language: repo.language, forks_count: repo.forks, stargazers_count: repo.stars } as unknown as RepoDetails);
    }
    setFavorited(!favorited);
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

  if (!repo) {
    return <div>Repositório não encontrado.</div>;
  }

  return (
    <div>
      <Container>
        <Box>
          <Avatar src={repo.owner.avatar_url}></Avatar>
          <Center>
            <Title>{repo.owner.login}</Title>
          </Center>
        </Box>
        <Box style={{width: '60¨%'}}>
          <Title>{repo.name}</Title>
          <Descricao>{repo.description}</Descricao>
          <Display>
            <Display>
              <DotColor language={repo.language} />{" "}
              <Text>{repo.language}</Text>
            </Display>
            <Display style={{ marginLeft: 50 }}>
              <Text>Última atualização: </Text>{" "}
              <Text>{formatDate(repo.updated_at)}</Text>
            </Display>
          </Display>
        </Box>

        <Favorite favorited={favorited} onClick={toggleFavorite}>
          <Display>
            <FontAwesomeIcon icon={favorited ? solidStar : regularStar} />
          </Display>
        </Favorite>
      </Container>
      <Box>
        <Title>Contribuidores</Title>
        <Center>
          {contributors.map((contributor) => (
            <Box key={contributor.login}>
              <Icon src={contributor.avatar_url}></Icon>
              <Title>{contributor.login}</Title>
            </Box>
          ))}
        </Center>
      </Box>
    </div>
  );
};

export default Detail;
