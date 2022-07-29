import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { errorHandler, loginValidationSchema } from '../lib/constants';
import { ErrorText } from '../components/ErrorText';
import { Button } from "./Button";
import { FormProps } from "../types";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 50px 40px;

  button {
    margin-top: 20px;
    font-family: ${({ theme }) => theme.fontFamily.secondary};
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
  }

  @media (max-width: 767px) {
    gap: 10px;

    button {
      margin-top: 10px;
      font-size: 16px;
      line-height: 22px;
    }
  }
`;

const FormTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormTitle = styled.h1`
  padding-bottom: 20px;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-weight: 700;
  font-size: 40px;
  line-height: 46px;
  color: ${({ theme }) => theme.color.black};
  text-align: center;

  @media (max-width: 767px) {
    font-size: 30px;
    line-height: 36px;
  }
`;

const FormTextInput = styled.input`
  padding: 10px 10px 10px 5px;
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.darkGrey};
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

const Form = ({ title, inputProps, submitHandler }: FormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginValidationSchema)
    });

  return (
    <StyledForm onSubmit={handleSubmit(submitHandler)}>
        <FormTitle>{title}</FormTitle>
        {inputProps && inputProps.map(props => (
            <FormTextContainer key={props.id}>
                <FormTextInput {...props} {...register(props.name)} />
                <ErrorText>{errors[props.name] && errorHandler((errors[props.name] as any).message)}</ErrorText>
            </FormTextContainer>
        ))}
        <Button type='submit'>{title}</Button>
    </StyledForm>
  )
}

export default Form