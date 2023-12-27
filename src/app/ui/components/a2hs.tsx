"use client";
import styles from './notice.module.scss'
import { useEffect, useState } from 'react';

const useA2HS = () => {
  /**
   * prompt가 실행될 수 있는 환경인 경우에만 모달창을 나타내기 위해
   * 변경 시 리렌더링을 발생시키기 위해서 useRef가 아닌 useState를 사용하였습니다.
   */
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    // beforeinstallprompt에 이벤트 핸들러를 등록합니다.
    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const installApp = () => {
    // 설치 메서드 실행
    deferredPrompt?.prompt();
    deferredPrompt?.userChoice.then((choiceResult: any) => {
      clearPrompt();
    });
  };

  const clearPrompt = () => {
    setDeferredPrompt(null);
  };

  return { deferredPrompt, installApp, clearPrompt };
}

export default function A2HS() {
  const { deferredPrompt, installApp, clearPrompt } = useA2HS();

  return deferredPrompt
    ? <button onClick={installApp} className={styles["notice-wrap"]}>
      <div className={styles["notice__content"]}>
        FC VALUE 앱 설치하기
      </div>
    </button >
    : <div className={styles["notice-wrap"]}>
      <div className={styles["notice__content"]}>
        (IOS) Safari &gt; 공유 &gt; &quot;홈 화면에 추가&quot;로 FC VALUE 앱을 설치할 수 있습니다.
      </div>
    </div >
}