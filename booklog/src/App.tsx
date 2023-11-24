import { useState } from 'react'
import { MOCK_DATA } from './mockdata' // モックデータの読み込み
import { BookItem } from './types/index' // 型の読み込み
import './App.css'
import './booklist.css'

function App() {
  const [item, setItem] = useState<BookItem>(MOCK_DATA.items[0])
  // モックデータのitemsをuseStateで管理
  // 現時点ではuseStateを使っていないのでsetItemが赤字になる？→setItemは省略できる！
  return (
    <>
      <div className="u-container">
        <ul className="c-book-list">
          <li className="c-book-list__item">
            {item.volumeInfo.imageLinks && ( //論理演算子でimageLinksがある時のみ表示。保存時に"()"がつく時とつかない時の差は？？
              <div className="c-book-list__img">
                <img src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} />
              </div>
            )}
            <div className="c-book-list__text">
              <h2 className="c-book-list__title">{item.volumeInfo.title}</h2>
              {item.volumeInfo.description && <p className="c-book-list__description">{item.volumeInfo.description}</p>}
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
        </ul>
      </div>
    </>
  )
}

export default App
