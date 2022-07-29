import styled from '@emotion/styled';
import { FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { FormTitle, inputs, signUpValidationSchema, URL } from '../lib/constants';
import { PATH } from '../lib/routes';

const StyledSection = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.grey};
`;

const StyledSectionContent = styled.section`
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    max-width: 50%;
  }

  @media (max-width: 425px) {
    max-width: 90%;
  }
`;

const StyledText = styled.p`
  padding-top: 10px;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: ${({ theme }) => theme.color.darkGrey};

  a {
    color: ${({ theme }) => theme.color.darkGrey};
  }

  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const SignUp = () => {
    const navigation = useNavigate();
    
    const onSubmitHandler = async({userName, fullName, email}: FieldValues) => {
        await fetch(URL.users, {
            method: 'POST',
            body: JSON.stringify({id: userName, name: fullName, email}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
           })
        navigation(PATH.HOME);
    }
    
    return (
        <StyledSection>
          <StyledSectionContent>
            <Form 
                title={FormTitle.SIGNUP} 
                inputProps={inputs.signUp} 
                submitHandler={onSubmitHandler}
                validationSchema={signUpValidationSchema}
            />
            <StyledText>Already have an account? <Link to={PATH.LOGIN}>Log in</Link></StyledText>
          </StyledSectionContent>
        </StyledSection>
    )
}

export default SignUp