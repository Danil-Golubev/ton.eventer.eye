import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css'
import { Html5QrcodeScanner } from 'html5-qrcode';

export const MainPage = () =>{
    const [decodedText, setDecodedText] = useState<string | null>(null);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [isScanned, setIsScanned] = useState(false);
  
    useEffect(() => {
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      };
  
      scannerRef.current = new Html5QrcodeScanner('qr-reader', config, false);
  
      scannerRef.current.render(
        (decodedText) => {
          setDecodedText(decodedText);
          setIsScanned(true); // Устанавливаем флаг, что пользователь отмечен
          playSound(); // Воспроизводим звук
          setTimeout(() => setIsScanned(false), 2000); // Убираем эффект через 2 секунды
        },
        (error) => {
          console.warn(`Ошибка сканирования: ${error}`);
        }
      );
  
      return () => {
        if (scannerRef.current) {
          scannerRef.current.clear();
        }
      };
    }, []);
  
    // Функция для воспроизведения звука
    const playSound = () => {
      const audio = new Audio('/sounds/confirmation.mp3'); // Звук для подтверждения
      audio.play();
    };
  
    return (
      <div className={styles.qrScannerContainer}>
        <div id="qr-reader" className={`${styles.qrReader} ${isScanned ? styles.scanned : ''}`}></div>
        {decodedText && <p className={styles.resultText}>Результат: {decodedText}</p>}
      </div>
    );
  };
