import styled from "@emotion/styled";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTweetValidationSchema, errorHandler, URL, useAppSelector } from "../lib/constants";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { ErrorText } from "./ErrorText";

const StyledSection = styled.section`
    width: 100%;
    max-width: 576px;
    margin: 0 auto;
    padding: 40px 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 15px;
    
    @media (max-width: 767px) {
        max-width: 95%;
    }
`;

const StyledForm = styled.form`
    width: 100%; 
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;

    button {
        width: 40%;
        border-radius: 10px; 
    }
`;

const StyledTextArea = styled.textarea`
    margin-top: 10px;
    padding: 15px;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.color.darkGrey};
    border-radius: 10px;
    resize: none;
    background-color: transparent;
    font-family: ${({ theme }) => theme.fontFamily.secondary};
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    color: ${({ theme }) => theme.color.black};

    &:placeholder {
        font-family: ${({ theme }) => theme.fontFamily.secondary};
        font-weight: 400;
        font-size: 20px;
        line-height: 26px;
        color: ${({ theme }) => theme.color.darkGrey};
    }

    @media (max-width: 767px) {
        font-size: 16px;
        line-height: 22px;
    
        &:placeholder {
          font-size: 16px;
          line-height: 22px;
        }
      }
`;

const AddTweet = () => {
    const { user } = useAppSelector((state) => state.user);
    const { tweets } = useAppSelector((state) => state.tweets);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(addTweetValidationSchema)
    });

    const onSubmitHandler = async({ tweet } : FieldValues) => {
        await fetch(URL.tweets, {
            method: 'POST',
            body: JSON.stringify({id: `${tweets.length + 1}`, author_id: user.name, text: tweet}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
           })
    }
    
  return (
    <StyledSection>
        <Avatar>
            { (user.name && user.name.charAt(0).toUpperCase()) || 
                JSON.parse(localStorage.getItem('user') || '{}').user.name.charAt(0).toUpperCase() }
        </Avatar>
        <StyledForm onSubmit={handleSubmit(onSubmitHandler)}>
            <StyledTextArea placeholder="What`s happening?" {...register('tweet')} />
            <ErrorText>{errors.tweet && errorHandler((errors.tweet as any).message)}</ErrorText>
            <Button type="submit">Tweet</Button>
        </StyledForm>
    </StyledSection>
  )
}

export default AddTweet