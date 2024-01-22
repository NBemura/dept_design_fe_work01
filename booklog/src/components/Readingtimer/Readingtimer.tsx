import { useEffect, useState } from 'react'
import './readingtimer.css'

export function Readingtimer() {
  //selectの時間を管理
  const [selectedTime, setSelectedTime] = useState(5)
  //タイマーの残り時間を管理
  const [currentTime, setCurrentTime] = useState(0)
  //タイマーが実行中かどうかを管理
  const [timerRunning, setTimerRunning] = useState(false)

  console.count('レンダリングです')

  //１）selectのvalueが変わるとselectedTimeを更新
  const handleTimeChange = (e) => {
    //parseIntで文字列を整数化
    setSelectedTime(parseInt(e.target.value, 10))
    //この時点では更新前のselectedTimeが表示される可能性
    console.log(selectedTime)
  }

  //２）スタートボタン
  const handleStartSubmit = (e) => {
    e.preventDefault()
    //実行中をtrueにする
    setTimerRunning(true)
    //残り時間をcurrentTimeにセット
    setCurrentTime(selectedTime)
    console.log('start!' + selectedTime)
  }

  //第二引数[timerRunning]が更新されたら実行
  useEffect(() => {
    console.count('useEffectです')

    if (timerRunning) {
      const intervalId = setInterval(() => {
        setCurrentTime((num) => {
          if (num > 0) {
            return num - 1
          } else {
            clearInterval(intervalId)
            setTimerRunning(false)
            return 0
          }
        })
      }, 1000)
      //初期化関数（無限ループ回避）
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [timerRunning])

  //タイマーの整形
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time / 60) % 60)
    const seconds = time % 60
    // return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return (
    <div className="c-reading-timer">
      <h2 className="c-reading-timer__title">読書タイマー</h2>
      <div className="c-reading-timer__counter">{formatTime(currentTime)}</div>
      <form className="c-reading-timer__form" onSubmit={handleStartSubmit}>
        <select className="c-reading-timer__select" value={selectedTime} onChange={handleTimeChange}>
          <option value={5}>5秒</option>
          <option value={10}>10秒</option>
          <option value={15}>15秒</option>
        </select>
        <button className="c-reading-timer__button">Start</button>
      </form>
    </div>
  )
}
