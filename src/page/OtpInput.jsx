/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";


const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Focus on the first input
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;

    // Only allow numeric input
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Allow only one character
    setOtp(newOtp);

    // Trigger submit when all fields are filled
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    // Move focus to the next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].select(); // Select the input content

    // Optional: Move focus if the previous input is empty
  if (index > 0 && !otp[index - 1]) {
    inputRefs.current[otp.indexOf("")]?.focus();
  }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      {otp.map ((value, index) => (
        <input
          key={index}
          type="text" // or type="number" based on your needs
          ref={(input) => (inputRefs.current[index] = input)}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="otpInput"
          maxLength={1} // Prevent entering more than one digit
        />  
      ))} 
    </div>
  );
};

export default OtpInput;
