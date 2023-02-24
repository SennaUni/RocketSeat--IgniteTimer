import React from 'react'

import { ButtonContainer, ButtonVariant } from './styles'

interface ButtonProps {
  variant?: ButtonVariant
}

export const Button = ({ variant = 'primary' }: ButtonProps) => {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}
