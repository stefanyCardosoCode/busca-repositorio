import React, { useState } from "react";
import { Box, CardWrapper, Descricao, Destaque, Display, DotColor, Favorite, Icon, Text, Link, Title } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Link as Li } from 'react-router-dom';
import { addFavorite, isFavorite, removeFavorite } from "../../services/managerFavorite";
import { RepoDetails } from "../../utils/types";

export default function Card({
    id,
    repositoryName,
    projectName,
    description,
    language,
    stars,
    forks
}: CardProps) {
    const [favorited, setFavorited] = useState(isFavorite(id));
    
    const toggleFavorite = () => {
        if (favorited) {
          removeFavorite(id);
        } else {
          addFavorite({ id, name: projectName, owner: { login: repositoryName }, description, language, forks_count: forks, stargazers_count: stars } as RepoDetails);
        }
        setFavorited(!favorited);
      };
  return (
    <CardWrapper>
        <Box>
            <Display>
                <Icon src="repository.png"></Icon>
                <Li to={`/detalhe/${id}`}>
                    <Title>{repositoryName} / <Destaque>{projectName}</Destaque></Title>
                </Li>
            </Display>
            <Descricao>
                {description}
            </Descricao>
            <Display>
                <DotColor language={language}></DotColor>
                <Text>{language}</Text>
                <Link>
                    <Icon src="star.png"></Icon>
                    <Text>{stars}</Text>
                </Link>
                <Link>
                    <Icon src="code.png"></Icon>
                    <Text>{forks}</Text>
                </Link>
            </Display>
        </Box>
        <Favorite favorited={favorited} onClick={toggleFavorite}>
            <Display>
                <FontAwesomeIcon icon={favorited ? solidStar : regularStar} />
            </Display>
        </Favorite> 
    </CardWrapper>
  );
}

interface CardProps {
    id: number;
    repositoryName: string;
    projectName: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
}