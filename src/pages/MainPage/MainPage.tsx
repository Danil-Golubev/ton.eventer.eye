import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css'
import { Html5QrcodeScanner } from 'html5-qrcode';

export const MainPage = () =>{
    const [decodedText, setDecodedText] = useState<string | null>(null);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  
    useEffect(() => {
      const config = {
        fps: 10, // количество кадров в секунду
        qrbox: { width: 250, height: 250 }, // область для отображения камеры
      };
  
      scannerRef.current = new Html5QrcodeScanner('qr-reader', config, false);
  
      scannerRef.current.render(
        (decodedText) => {
          setDecodedText(decodedText); // сохраняем результат
        },
        (error) => {
          console.warn(`QR код сканировать не удалось: ${error}`);
        }
      );
  
      return () => {
        if (scannerRef.current) {
          scannerRef.current.clear();
        }
      };
    }, []);
  
      return(

        <div className="App">
      <div className={styles.qrScannerContainer}>
      <div id="qr-reader" className={styles.qrReader}></div>
      {decodedText && <p className={styles.resultText}>Результат: {decodedText}</p>}
    </div>
      </div>
      )
    
}