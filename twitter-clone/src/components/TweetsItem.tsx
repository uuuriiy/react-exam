import styled from "@emotion/styled";
import { TweetProps } from "../types";
import { Avatar } from "./Avatar";
import { Sanitized } from "./Sanitized";

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: ${({ theme }) => theme.color.grey};
  padding: 20px;
  border-radius: 10px;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    color: ${({ theme }) => theme.color.black};

    @media (max-width: 767px) {
      font-size: 20px;
      line-height: 26px;
    }
  }
`;


const TweetsItem = ({ tweet: { author_id, text} }: TweetProps) => {
  return (
    <StyledSection>
      <Avatar>{author_id && author_id.charAt(0).toUpperCase()}</Avatar>
      <StyledInfo>
        <h3>{author_id}</h3>
        <Sanitized html={text} />
      </StyledInfo>
    </StyledSection>
  )
}

export default TweetsItem