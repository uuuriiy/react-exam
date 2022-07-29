import styled from "@emotion/styled";

export const ErrorText = styled.p`
  padding-top: 5px;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: ${({ theme }) => theme.color.red};

  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 22px;
  }
`;