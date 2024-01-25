import { useEffect, useState, useRef } from 'react'
import './readingtimer.css'

export function Readingtimer() {
  //useRefでselectを参照
  const selectedTimeRef = useRef<HTMLSelectElement>(null)
  //タイマーの残り時間を管理
  const [currentTime, setCurrentTime] = useState<number>(0)
  //タイマーが実行中かどうかを管理
  const [timerRunning, setTimerRunning] = useState<boolean>(false)
  //初回ロードの判定
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  console.count('レンダリングです')

  //スタートボタン
  const handleStartSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //実行中をtrueにする
    setTimerRunning(true)
    //残り時間をcurrentTimeにセット。
    //refオブジェクトは.currentでDOMにアクセスでき、文字列で取得されるためNumberで数値化
    setCurrentTime(Number(selectedTimeRef.current?.value))
  }

  //第二引数[timerRunning]が更新されたら実行
  useEffect(() => {
    console.count('useEffectです')

    if (!timerRunning) return
    const intervalId = setInterval(() => {
      setCurrentTime((num: number) => {
        if (num > 0) {
          return num - 1
        } else {
          clearInterval(intervalId)
          setTimerRunning(false)
          setFirstLoad(false)
          return 0
        }
      })
    }, 1000)
    //初期化関数（無限ループ回避）
    return () => {
      clearInterval(intervalId)
    }
  }, [timerRunning])

  //タイマーの整形
  const formatTime = (time: number) => {
    const seconds: number = time % 60
    return String(seconds).padStart(2, '0')
  }
  console.log('firstLoad:' + firstLoad + ',timerRunning:' + timerRunning)
  return (
    <div className={`c-reading-timer ${timerRunning || firstLoad ? '' : 'is-finished'}`}>
      <h2 className="c-reading-timer__title">読書タイマー</h2>
      <div className="c-reading-timer__counter">
        {timerRunning || firstLoad ? <>残り{formatTime(currentTime)}秒</> : '終了'}
      </div>
      <form className="c-reading-timer__form" onSubmit={handleStartSubmit}>
        {/* useRefを使うことで、変更のたびにレンダリングを発生しないようにできる。（非制御コンポーネント） */}
        <select className="c-reading-timer__select" name="slectedTime" ref={selectedTimeRef}>
          <option value="5">5秒</option>
          <option value="10">10秒</option>
          <option value="15">15秒</option>
        </select>
        <button className="c-reading-timer__button">Start</button>
      </form>
    </div>
  )
}
