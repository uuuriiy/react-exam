import styled from "@emotion/styled";
import DOMPurify from "dompurify";

const StyledText = styled.p`
    font-family: ${({ theme }) => theme.fontFamily.secondary};
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    color: ${({ theme }) => theme.color.darkGrey};

    @media (max-width: 767px) {
        font-size: 16px;
        line-height: 22px;
    }
`;

export const Sanitized = ({ html }: {html: string}) => 
    <StyledText dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html)}} />;

