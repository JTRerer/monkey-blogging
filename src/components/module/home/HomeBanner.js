import React from "react";
import styled from "styled-components";
import Button from "../../button/Button";
const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );

  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Vin Second-hand Market</h1>
            <p className="banner-desc">
              Explore a vast and diverse collection of clothing, accessories,
              furniture, and more, all conveniently accessible from the comfort
              of your own home. Each item has its own story to tell, with a
              history that adds character and depth to your purchase. Discover
              the joy of sustainable shopping, as Vin Second-hand Market
              supports the eco-conscious consumer by promoting the re-use and
              upcycling of goods. By choosing second-hand treasures, you not
              only save money but also contribute to a more environmentally
              friendly way of living.
            </p>
            <Button to="/sign-up" kind="secondary">
              Get Started
            </Button>
          </div>
          <div className="banner-image">
            <img src="/img-banner.png" alt="banner" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
