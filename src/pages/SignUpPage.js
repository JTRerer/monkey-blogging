import React, { useEffect } from "react";
import styled from "styled-components";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { Input } from "../components/input";
import { Field } from "../components/field";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { useState } from "react";
import Button from "../components/button/Button";
import { LoadingSpinner } from "../components/loading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { toInteger } from "lodash";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
const SignUpPageStyles = styled.div`
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
`;
const schema = yup
  .object({
    fullname: yup.string().required("Please enter your full name"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters or greater")
      .required("Please enter your password"),
    address: yup.string().required("Please enter your address"),
  })
  .shape({
    phone: yup
      .string()
      .required("Please enter your phone number")
      .matches(
        /(?:\d{1,3}[- ]?)?\d{10}$/,
        "Invalid phone number format. Please use the format: 1234567890"
      ),
  });
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
      values.address
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    const colRef = collection(db, "users");
    await addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      address: values.address,
      phone: values.phone,
    });
    toast.success("Register successfully!");
    navigate("/");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  };
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  return (
    <SignUpPageStyles>
      <div className="container">
        <img
          srcSet="/logo.png 2x"
          alt="vin-secondhand-market"
          className="logo"
        />
        <h1 className="heading">Vin Secondhand Market</h1>
        <form
          className="form"
          onSubmit={handleSubmit(handleSignUp)}
          autoComplete="off"
        >
          <Field>
            <Label htmlFor="fullname" className="label">
              Fullname
            </Label>
            <Input
              name="fullname"
              type="text"
              placeholder="Enter your fullname"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="email" className="label">
              Email adress
            </Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="password" className="label">
              Password
            </Label>
            <Input
              name="password"
              type={togglePassword ? "text" : "password"}
              placeholder="Enter your password"
              control={control}
            >
              {!togglePassword ? (
                <IconEyeClose
                  onClick={() => setTogglePassword(true)}
                ></IconEyeClose>
              ) : (
                <IconEyeOpen
                  onClick={() => setTogglePassword(false)}
                ></IconEyeOpen>
              )}
            </Input>
          </Field>
          <Field>
            <Label htmlFor="address" className="label">
              Adress
            </Label>
            <Input
              name="address"
              type="text"
              placeholder="Enter your address"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="phone" className="label">
              Phone Number
            </Label>
            <Input
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              control={control}
            />
          </Field>
          <Button
            type="submit"
            style={{
              maxWidth: 300,
              margin: "0 auto",
            }}
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
