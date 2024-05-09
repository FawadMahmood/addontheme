import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  height: 50px;
    
  ${({ theme }) => theme && css`
    background-color: ${theme.backgroundColor};
    color: ${theme.textColor};

    &:hover {
      background-color: ${theme.hoverColor};
    }

    &:active {
      background-color: ${theme.activeColor};
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MyCustomButton = ({ theme }: { theme: DefaultTheme }) => {
  return <StyledButton {...theme} >CLICK ME</StyledButton>;
};