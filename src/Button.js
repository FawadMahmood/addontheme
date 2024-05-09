// src/Button.js
import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

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

const MyCustomButton = ({ theme }) => {
  return <StyledButton theme={theme} />;
};

export default MyCustomButton;