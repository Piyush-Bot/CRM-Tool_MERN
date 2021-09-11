import React from "react";
import { CarouselProvider, DotGroup, Slide, Slider } from "pure-react-carousel";
import { Element } from "react-scroll";
import styled from "styled-components";
import { Marginer } from "./Marginer";
import { ReviewCard } from "./ReviewCard";
import { SectionTitle } from "./SectionTitle";
import { useMediaQuery } from "react-responsive";

import "pure-react-carousel/dist/react-carousel.es.css";

import User1Img from "../../images/img-1.jpg";
import User2Img from "../../images/img-2.jpg";
import User3Img from "../../images/img-3.jpg";
import User4Img from "../../images/img-4.jpg";

const ReviewsContainer = styled(Element)`
  background-color: white;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCarouselProvider = styled(CarouselProvider)`
  width: 100%;
  height: 50%;

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const StyledSlide = styled(Slide)`
  .carousel__inner-slide {
    display: flex;
    justify-content: center;
  }
`;

const StyledDotGroup = styled(DotGroup)`
  display: flex;
  margin-top: 10px;
  justify-content: center;
  button {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #e4e4e4;
    border: none;
    outline: none;
    &:not(:last-of-type) {
      margin-right: 3px;
    }
  }

  .carousel__dot--selected {
    background-color: black;
  }
`;

export function Review(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div>
      <ReviewsContainer>
        <SectionTitle>What others are saying about us </SectionTitle>
        <Marginer direction="vertical" margin="5 em" />
        <StyledCarouselProvider
          naturalSlideWidth={250}
          naturalSlideHeight={isMobile ? 250 : 250}
          totalSlides={6}
          visibleSlides={isMobile ? 1 : 3}
          dragEnabled={false}
        >
          <Slider>
            <StyledSlide index={0}>
              <ReviewCard
                reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
                username="John coner"
                userImgUrl={User1Img}
              />
            </StyledSlide>
            <StyledSlide index={1}>
              <ReviewCard
                reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
                username="John coner"
                userImgUrl={User2Img}
              />
            </StyledSlide>
            <StyledSlide index={2}>
              <ReviewCard
                reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
                username="John coner"
                userImgUrl={User3Img}
              />
            </StyledSlide>
            <StyledSlide index={3}>
              <ReviewCard
                reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
                username="John coner"
                userImgUrl={User4Img}
              />
            </StyledSlide>
            <StyledSlide index={4}>
              <ReviewCard
                reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
                username="John coner"
                userImgUrl={User1Img}
              />
            </StyledSlide>
            <StyledSlide index={5}>
              <ReviewCard
                reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
                username="John coner"
                userImgUrl={User1Img}
              />
            </StyledSlide>
          </Slider>
          <StyledDotGroup />
        </StyledCarouselProvider>
      </ReviewsContainer>
    </div>
  );
}

export default Review;
