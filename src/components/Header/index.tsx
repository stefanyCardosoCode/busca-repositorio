import React from "react";
import { HeaderWrapper, Logo, Nav, NavItem, NavLink, NavList } from "./styles";

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo>Buscador de repositórios</Logo>
      <Nav>
        <NavList>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/favoritos">Favoritos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/meus-projetos">Meus projetos</NavLink>
          </NavItem>
        </NavList>
      </Nav>
    </HeaderWrapper>
  );
}