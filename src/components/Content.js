import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1206px;
  min-height: 600px;
  margin-bottom: ${({ theme }) => theme.space[5]}px;
`;

export default Content;
