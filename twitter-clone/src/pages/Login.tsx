import styled from '@emotion/styled';
import { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { FormTitle, inputs, loginValidationSchema, URL, useAppSelector } from '../lib/constants';
import { PATH } from '../lib/routes';
import { getUserByUserName } from '../redux/modules/user';
import { getUsers } from '../redux/modules/users';
import { TDispatch, User } from '../types';

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

const Login = () => {
  const navigation = useNavigate();
  const { users } = useAppSelector((state) => state.users);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch<TDispatch>();

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    dispatch(getUsers(URL.users));
  }

  const onSubmitHandler = async({ email }: FieldValues) => {
    if (users.length) {
      const findUser = users.find((el: User) => el.email === email);
      await dispatch(getUserByUserName(URL.users, findUser.id));

      const savedUser = JSON.parse(localStorage.getItem('user') || '{}').user;

      if (Object.keys(user).length || Object.keys(savedUser).length) {
        navigation(PATH.HOME);
      }
    }
  }

  
  return (
    <StyledSection>
      <StyledSectionContent>
        <Form 
          title={FormTitle.LOGIN} 
          inputProps={inputs.login} 
          submitHandler={onSubmitHandler}
          validationSchema={loginValidationSchema} 
        />
        <StyledText>Don't have an account? <Link to={PATH.SIGNUP}>Sign up</Link></StyledText>
      </StyledSectionContent>
    </StyledSection>
  )
}

export default Login