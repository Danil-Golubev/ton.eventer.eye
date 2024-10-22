import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import { Html5Qrcode } from 'html5-qrcode';

function App() {
  const [isEnabled, setEnabled] = useState(false)
const [res, setRes] = useState('')
// const [res2, setRes2] = useState('')
  useEffect(()=>{

    const config = {fps:10, qrbox:{width:200, height:200}}

    const html5QrCode = new Html5Qrcode('qrCodeContainer')

    if(isEnabled){
      html5QrCode.start({facingMode:'environment'}, config, ()=>{},  (decodedText, decodedResult) => {setRes(decodedText)})
    }

  },[isEnabled])


  return (
    <div className="App">
      
      <div id ='qrCodeContainer'></div>
      <button className='button' onClick={()=>setEnabled(!isEnabled)}>scan</button>
      <div>{res}</div>

    </div>
  );
}

export default App;
