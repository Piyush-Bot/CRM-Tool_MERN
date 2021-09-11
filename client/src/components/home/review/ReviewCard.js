// import { faQuoteLeft } from "@/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/fontawesome";
import React from "react";
import styled from "styled-components";
import { Marginer } from "./Marginer";

const CardContainer = styled.div`
  width: 350px;
  height: 430px;
  background-color: #fff;
  box-shadow: 0px 0px 7px rgba(17, 17, 17, 0.2);
  border-radius: 5px;
  margin: 5px 10px;
  position: relative;
  padding: 0px 5px;
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: 0px;
  left: 17px;
  color: #d1d1d1;
  font-size: 37px;
`;

const ReviewText = styled.p`
  font-size: 17px;
  color: #585858;
  font-weight: 500;
  display: flex;
  justify-content: center;
`;

const Line = styled.span`
  min-width: 100%;
  min-height: 1px;
  margin-bottom: 1em;
  background-color: #cdcdcd;
  display: flex;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Username = styled.span`
  font-size: 15px;
  color: #000;
`;

export function ReviewCard(props) {
  const { reviewText, username, userImgUrl } = props;

  return (
    <CardContainer>
      <QuoteIcon>{/* <FontAwesomeIcon icon={faQuoteLeft} /> */}</QuoteIcon>
      <Marginer direction="vertical" margin="6em" />
      <ReviewText>{reviewText}</ReviewText>
      <Marginer direction="vertical" margin="7em" />
      <Line />
      <UserDetails>
        <UserImg src={userImgUrl} />
        <Username>{username}</Username>
      </UserDetails>
    </CardContainer>
  );
}
