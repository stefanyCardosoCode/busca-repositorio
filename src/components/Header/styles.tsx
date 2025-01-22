import styled from "styled-components";

export const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 20px;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
`;

export const Logo = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

export const Nav = styled.nav`
  margin-top: 15px;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
`;

export const NavItem = styled.li`
  margin: 0 15px;
`;

export const NavLink = styled.a`
  color: ${(props) => props.theme.colors.white}; 
  text-decoration: none;
  font-size: 1rem;
  
  &:hover {
    color: ${(props) => props.theme.colors.accent};
    text-decoration: underline;
  }
`;