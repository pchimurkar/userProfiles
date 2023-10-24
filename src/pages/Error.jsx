import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import route from './../routes/route.json'
import { useEffect, useState } from "react";

const Error = () => {

    const navigate = useNavigate();

    const [countdown,setCountdown] = useState(5);

    useEffect(()=>{
        if(countdown > 0){
            setTimeout(()=>{
                setCountdown(countdown - 1);
            },1000);
        } else{
            navigate(route.HOME);
        }  
    },[countdown,navigate]);
   

  return (
    <div style={{textAlign:'center'}}>
    <div style={{color:'red'}}>
      <h2>404:Not FOund</h2>
      <p>Error : Invalid page path ,please redirect to New page</p>
        <div>
            <Button variant="primary"
            onClick={() =>navigate(route.HOME)}>Go to HomePage</Button>
        </div>
    </div>
    <p className="mt-3">You will auto-redirect to home page in {countdown} seconds</p>
    </div>
  );
};

export default Error;
