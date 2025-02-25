import {useState} from "react";
import OtpInput from "./OtpInput";
import OtpSubmittedMessage from "./OtpSubmited";


const PhoneOtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSubmitted, setOtpSubmitted] = useState(false);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    // phone validations
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    // Call BE API
    // show OTP Field
    setShowOtpInput(true);
  };

  const onOtpSubmit = (otp) => {
    console.log("Login Successful", otp);
    setOtpSubmitted(true)
  };

  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
          />
          <button type="submit">Submit</button>
        </form>
      ) :  otpSubmitted ? (
         <OtpSubmittedMessage /> // Show message if OTP is submitted
     ) :(
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpLogin;