import React from "react";
import styled from "styled-components";
const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
    border-radius: 100%;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .have-account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;
const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <img
          srcSet="/logo.png 2x"
          alt="vin-secondhand-market"
          className="logo"
        />
        <h1 className="heading">Vin Secondhand Market</h1>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;