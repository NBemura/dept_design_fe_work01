import { useState } from 'react'
import { MOCK_DATA } from './mockdata' // モックデータの読み込み
import { BookItem } from './types/index' // 型の読み込み
import './App.css'
import './booklist.css'

function App() {
  const [items, setItems] = useState<BookItem[]>(MOCK_DATA.items)
  //複数のデータを格納(念の為複数形に変更)。BookItemの型も配列を指定。

  return (
    <>
      <header className="l-header">
        <h1 className="l-header__logo">Booklog</h1>
      </header>
      <main className="l-main">
        <div className="u-container">
          <ul className="c-book-list">
            {items.map((item) => (
              //格納したデータをループ表示
              <li className="c-book-list__item">
                {item.volumeInfo.imageLinks && (
                  <div className="c-book-list__img">
                    <img src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} />
                  </div>
                )}
                <div className="c-book-list__text">
                  <h2 className="c-book-list__title">{item.volumeInfo.title}</h2>
                  {item.volumeInfo.description && (
                    <p className="c-book-list__description">{item.volumeInfo.description}</p>
                  )}
                  <div className="c-book-list__other">
                    {item.volumeInfo.authors && (
                      <div className="c-book-list__authors">著者：{item.volumeInfo.authors.join('、')}</div>
                    )}
                    {item.volumeInfo.publisher && (
                      <div className="c-book-list__publisher">出版社：{item.volumeInfo.publisher}</div>
                    )}
                  </div>
                  {item.volumeInfo.previewLink && (
                    <div className="c-book-list-action">
                      <a className="c-book-list-action__link" href={item.volumeInfo.previewLink} target="_blank">
                        詳しく見る
                      </a>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export default App
