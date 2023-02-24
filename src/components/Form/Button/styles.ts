import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonVariant = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  margin: 5px;
  color: #fff;
  font-weight: bolder;
  border-radius: 10px;
  border: 0;
  cursor: pointer;

  background-color: ${(props) => props.theme['green-500']};

  /* ${(props) => css`
    background-color: ${buttonVariant[props.variant]};
  `} */
`
