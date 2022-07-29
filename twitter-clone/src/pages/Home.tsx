import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Oval } from  'react-loader-spinner'
import AddTweet from "../components/AddTweet";
import Header from "../components/Header";
import { URL, useAppSelector } from "../lib/constants";
import { getTweets } from "../redux/modules/tweets";
import { TDispatch, Tweet } from "../types";
import { ErrorText } from "../components/ErrorText";
import TweetsItem from "../components/TweetsItem";
import { useNavigate } from "react-router-dom";
import { PATH } from "../lib/routes";

const StyledTweetsContainer = styled.div`
  width: 100%;
  max-width: 676px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  @media (max-width: 767px) {
    max-width: 95%;
  }
`;

const Home = () => {
  const navigation = useNavigate();
  const { tweets, isLoading } = useAppSelector((state) => state.tweets);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch<TDispatch>();
  

  useEffect(() => {
    loadTweets()
  }, [tweets.length])

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}').user;

    if (!Object.keys(savedUser).length){
      navigation(PATH.LOGIN);
    }
 },[user]);

  const loadTweets = () => {
    dispatch(getTweets(URL.tweets));
  }

  return (
    <>
      <Header />
      <AddTweet />
      <StyledTweetsContainer>
        { isLoading && <Oval color="#2F71B7" height={80} width={80}/> }
        { !isLoading && !tweets.length && <ErrorText>No tweets found</ErrorText> }
        { !isLoading && tweets.length &&
          tweets.map((tweet: Tweet) => <TweetsItem key={tweet.id} tweet={tweet} />)
        }
      </StyledTweetsContainer>
    </>
  );
}

export default Home