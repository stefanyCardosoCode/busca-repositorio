import styled from "styled-components";
import { DotColorProps, Language } from "../../utils/types";

const languageColors: Record<Language, string> = {
    JavaScript: 'yellow',
    Python: 'blue',
    Java: 'green',
    Ruby: 'red',
  };
  
export const getLanguageColor = (language: string) => languageColors[language] || 'gray';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 100px;
  margin-top: 50px;

  @media (max-width: 560px) {
    display: block;
  }
`;

export const Display = styled.div`
  display: flex;
  align-items: center;  
`;

export const Box = styled.div`
    padding: 10px;
    @media (max-width: 560px) {
       display: grid;
       align-items: center;
    }
`;

export const Avatar = styled.img`
    width: 200px;
    height: 200px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: rebeccapurple;

    @media (max-width: 560px) {
        margin: 0 auto;
    }
`;

export const Icon = styled.img`
    width: 100px;
    height: 100px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: rebeccapurple;
`;

export const Title = styled.h2`
    color: ${(props) => props.theme.colors.primary};
    font-size: 20px;
    margin: 15px 0px 15px 0px;
`;

export const Destaque = styled.span`
    font-weight: 800;
`;

export const Descricao = styled.p`
    color: ${(props) => props.theme.colors.gray};
    font-size: 16px;
    margin: 10px 0px 10px 0px;
    text-align: left;
`;

export const DotColor = styled.span<DotColorProps>`
    position: relative;
    top: 1px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ language }) => getLanguageColor(language)};;
    margin-right: 5px;
`;

export const Text = styled.p`
    color: ${(props) => props.theme.colors.gray};
    font-size: 16px;
`;

export const Link = styled.a`
    text-decoration: none;
    color: transparent;
    cursor: pointer;
    margin-left: 20px;
    display: flex;
    align-items: center;
`;

export const Favorite = styled.div<{ favorited: boolean }>`
    position: absolute; 
    top: 187px; 
    right: 245px;
    cursor: pointer;

    svg {
        font-size: 24px;
        color: ${({ favorited }) => (favorited ? "#faf32d" : (props) => props.theme.colors.gray)};
        transition: color 0.3s ease; 
    }

    @media (max-width: 560px) {
        top: 458px; 
        right: 32px;
    }
`;

export const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
`;
