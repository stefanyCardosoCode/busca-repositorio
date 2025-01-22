import React from 'react';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Detail from './pages/Detalhe';
import Home from './pages/Home';
import GlobalStyle from './styles/globals';
import Container from '@mui/material/Container';
import Footer from './components/Footer';
import Favoritos from './pages/Favoritos';
import MeusProjetos from './pages/MeusProjetos';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/meus-projetos" element={<MeusProjetos />} />
            <Route path="/detalhe/:id" element={<Detail />} />
          </Routes>
        </Container>
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
