import styled from '@emotion/styled';

export type ButtonProps = {
  variant?: 'blue' | 'grey';
};

export const Button = styled.button<ButtonProps>`
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  padding: 10px;

  border: 2px solid ${({ theme, variant = 'blue' }) => theme.color[variant]};
  background-color: ${({ theme, variant = 'blue' }) => theme.color[variant]};
  color: ${({ theme, variant = 'blue' }) =>
    variant === 'blue' ? theme.color.white : theme.color.black};

  transition: 0.3s ease-in-out;

  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.color.black};
  }
`;