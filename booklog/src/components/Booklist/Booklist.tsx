import { BookItem } from '../../types/index' // 型の読み込み
import './booklist.css'

// Propsの型
// App.tsxのuseStateの箇所で使った型とは別に、子コンポーネントでも定義が必要？？
// →App.tsxは変数の型、こちらはPropsの型で両方必要！
type BookListProps = {
  items: BookItem[]
  handleAddMyBook: (newBook: BookItem) => void
}

//引数に使うデータ（items）を渡し、型をつける
export function Booklist({ items, handleAddMyBook }: BookListProps) {
  return (
    <ul className="c-book-list">
      {/* 複数の式が入る場合は”()”ではなく”{}” */}
      {items.map((item) => {
        const { imageLinks, title, description, authors, publisher, previewLink } = item.volumeInfo
        return (
          <li className="c-book-list__item" key={item.id}>
            {imageLinks && (
              <div className="c-book-list__img">
                <img src={imageLinks.thumbnail} alt={title} />
              </div>
            )}
            <div className="c-book-list__text">
              <h2 className="c-book-list__title">{title}</h2>
              {description && <p className="c-book-list__description">{description}</p>}
              {(authors || publisher) && (
                <div className="c-book-list__other">
                  {authors && <div className="c-book-list__authors">著者：{authors.join('、')}</div>}{' '}
                  {publisher && <div className="c-book-list__publisher">出版社：{publisher}</div>}
                </div>
              )}
              <ul className="c-book-list-action">
                {previewLink && (
                  <li className="c-book-list-action__item">
                    <a className="c-book-list-action__link" href={previewLink} target="_blank">
                      詳しく見る
                    </a>
                  </li>
                )}
                <li className="c-book-list-action__item">
                  {/* onClickにて現在の書籍を引数に渡す */}
                  <button
                    className="c-book-list-action__link is-mybook"
                    type="button"
                    onClick={() => handleAddMyBook(item)}
                  >
                    MyBooksに追加
                  </button>
                </li>
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
