import styled from "styled-components";
import { DotColorProps, Language } from "../../utils/types";

const languageColors: Record<Language, string> = {
    JavaScript: 'yellow',
    Python: 'blue',
    Java: 'green',
    Ruby: 'red',
  };
  
export const getLanguageColor = (language: string) => languageColors[language] || 'gray';

export const CardWrapper = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  padding: 20px;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.lines};
  position: relative;
  width: 100%;
`;

export const Display = styled.div`
  display: flex;
  align-items: center;
`;

export const Box = styled.div`
    
`;

export const Icon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`;

export const Title = styled.h2`
    color: ${(props) => props.theme.colors.primary};
    font-size: 20px;
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
    top: 10px; 
    right: 10px;
    cursor: pointer;

    svg {
        font-size: 24px;
        color: ${({ favorited }) => (favorited ? "#faf32d" : (props) => props.theme.colors.gray)};
        transition: color 0.3s ease; 
    }
`;
