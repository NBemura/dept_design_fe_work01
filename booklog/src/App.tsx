import { useState } from 'react'
import { MOCK_DATA } from './mockdata' // モックデータの読み込み
import './App.css'
import './booklist.css'

function App() {
  const [item, setItem] = useState(MOCK_DATA.items[0])
  // モックデータのitemsをuseStateで管理
  // 現時点ではuseStateを使っていないのでsetItemが赤字になる？
  return (
    <>
      <div className="u-container">
        <ul className="c-book-list">
          <li className="c-book-list__item">
            <div className="c-book-list__img">
              <img src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} />
            </div>
            <div className="c-book-list__text">
              <h2 className="c-book-list__title">{item.volumeInfo.title}</h2>
              <p className="c-book-list__description">{item.volumeInfo.description}</p>
              <div className="c-book-list__other">
                <div className="c-book-list__authors">著者: {item.volumeInfo.authors}</div>
                <div className="c-book-list__publisher">出版社: {item.volumeInfo.publisher}</div>
              </div>
              <div className="c-book-list-action">
                <a className="c-book-list-action__link" href={item.volumeInfo.infoLink} target="_blank">
                  詳しく見る
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default App
