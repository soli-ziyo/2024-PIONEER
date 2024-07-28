import React, { useState } from "react";
import styled from "styled-components";
import PhoneInputScreen from "../components/Landing/PhoneInputScreen";
import CodeInputScreen from "../components/Landing/CodeInputScreen";
import SignupScreen from "../components/Landing/SignupScreen";
import ProfileSetupScreen from "../components/Landing/ProfileSetupScreen";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return <PhoneInputScreen setPhone={setPhone} nextStep={nextStep} />;
    case 2:
      return (
        <CodeInputScreen
          phone={phone}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return <SignupScreen nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return <ProfileSetupScreen prevStep={prevStep} />;
    default:
      return null;
  }
};

export default SignupPage;
