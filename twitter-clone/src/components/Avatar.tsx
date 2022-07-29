import styled from "@emotion/styled";

export const Avatar = styled.div`
  padding: 30px 38px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.blue};
  border: 1px solid ${({ theme }) => theme.color.blue};
  font-family: ${({ theme }) => theme.fontFamily.primary}
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  color: ${({ theme }) => theme.color.white};

  @media (max-width: 767px) {
    padding: 20px 25px;
    font-size: 20px;
    line-height: 26px;
  }
`;