import styled from 'styled-components';

export const BackgroundContainer = styled.div`
  background-image: url(${(props) => props.url});
  width: 80vh;
  background-size: cover;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;
