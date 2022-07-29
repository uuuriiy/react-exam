import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import TwitterIcon from "../assets/twitter.svg"
import { useAppSelector } from "../lib/constants";
import { PATH } from "../lib/routes";
import { Avatar } from "./Avatar";

const StyledHeader = styled.header`
  padding: 20px;
  background: ${({ theme }) => theme.color.grey};
  border-bottom: 1px solid ${({ theme }) => theme.color.grey};
`;

const StyledHeaderContent = styled.div`
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledImage = styled.img`
  object-fit: contain;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 1024px) {
    &:hover {
      transform: none;
    }
  }

  @media (max-width: 767px) {
    width: 66px;
    height: 66px;
  }
`;

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  h3 {
    font-family: ${({ theme }) => theme.fontFamily.secondary}
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;
    color: ${({ theme }) => theme.color.darkGrey};

    @media (max-width: 767px) {
      display: none;
    }
  }
`;

const Header = () => {
  const navigation = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  
  return (
    <StyledHeader>
      <StyledHeaderContent>
        <StyledImage src={TwitterIcon} onClick={() => navigation(PATH.LOGIN)}/>
        <StyledInfo>
            <h3>{user.name || JSON.parse(localStorage.getItem('user') || '{}').user.name}</h3>
            <Avatar>
              {
                (user.name && user.name.charAt(0).toUpperCase()) ||
                JSON.parse(localStorage.getItem('user') || '{}').user.name.charAt(0).toUpperCase()
              }
            </Avatar>
          </StyledInfo>
      </StyledHeaderContent>
    </StyledHeader>
  );
}

export default Header