import styled from "styled-components";

export const FooterWrapper = styled.header`
  background-color: ${(props) => props.theme.colors.lines};
  padding: 20px;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  margin-top: 50px;
  height: 60px;
`;
