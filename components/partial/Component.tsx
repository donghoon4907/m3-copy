import styled from "styled-components";

import { mixinBgLv1 } from "../../theme/mixins/background";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  width: 100%;
  height: 100%;
  padding: 5px;

  ${({ theme }) => theme.breakPoint.md} {
    flex-direction: column;
    overflow-y: scroll;
  }
`;

export const Aside = styled.aside`
  width: 300px;
  height: 330px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 5px;

  ${({ theme }) => theme.breakPoint.md} {
    width: 100%;
  }

  ${mixinBgLv1}
`;
