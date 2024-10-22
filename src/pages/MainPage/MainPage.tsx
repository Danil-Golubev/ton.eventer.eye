import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css'
import { Html5QrcodeScanner } from 'html5-qrcode';

export const MainPage = () =>{
    const [decodedText, setDecodedText] = useState<string | null>(null);
    const [isScanned, setIsScanned] = useState(false);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  
    useEffect(() => {
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      };
  
      scannerRef.current = new Html5QrcodeScanner('qr-reader', config, false);
  
      scannerRef.current.render(
        (decodedText) => {
          setDecodedText(decodedText); // Сохраняем закодированный текст
          setIsScanned(true); // Показать сообщение об успешном сканировании
          playSound(); // Воспроизвести звук
  
          // Очищаем и закрываем сканер
          if (scannerRef.current) {
            scannerRef.current.clear();
          }
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
      const audio = new Audio('/sounds/confirmation.mp3');
      audio.play();
    };
  
    return (
      <div className={styles.qrScannerContainer}>
        {!isScanned ? (
          <div id="qr-reader" className={styles.qrReader}></div>
        ) : (
          <div className={styles.resultContainer}>
            <h2 className={styles.successMessage}>Успешно просканировано!</h2>
            <p className={styles.resultText}>Информация: {decodedText}</p>
          </div>
        )}
      </div>
    );
  };
  