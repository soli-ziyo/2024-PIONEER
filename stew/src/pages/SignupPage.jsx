import React, { useState } from "react";
import PhoneInputScreen from "../components/Landing/PhoneInputScreen";
import CodeInputScreen from "../components/Landing/CodeInputScreen";
import SignupScreen from "../components/Landing/SignupScreen";
import ProfileSetupScreen from "../components/Landing/ProfileSetupScreen";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

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
      return (
        <SignupScreen
          nextStep={(id, password) => {
            setId(id);
            setPassword(password);
            nextStep();
          }}
          prevStep={prevStep}
        />
      );
    case 4:
      return (
        <ProfileSetupScreen
          id={id}
          password={password}
          phone={phone}
          prevStep={prevStep}
        />
      );
    default:
      return null;
  }
};

export default SignupPage;
