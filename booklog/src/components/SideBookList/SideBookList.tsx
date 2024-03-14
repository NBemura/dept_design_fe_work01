import { BookItem } from '../../types/index' // 型の読み込み
import './sidebooklist.css'

type SideBookListProps = {
  myBookItems: BookItem[]
  handleRemoveMyBook: (myBookID: string) => void
}

// propsの書き方として、propsにするか、{}で名前をつけて渡すかどちらが良いなどあるでしょうか？？
export function SideBookList(props: SideBookListProps) {
  return (
    <ul className="p-side-mybook-list">
      {props.myBookItems.map((item) => {
        const { imageLinks, title, authors, previewLink } = item.volumeInfo
        return (
          <li className="p-side-mybook-list__item" key={item.id}>
            {imageLinks && (
              <div className="p-side-mybook-list__img">
                <img src={imageLinks.thumbnail} alt={title} />
              </div>
            )}
            <div className="p-side-mybook-list__text">
              <div className="p-side-mybook-list__title">{title}</div>
              {authors && <div className="p-side-mybook-list__authors">著者：{authors.join('、')}</div>}
              <ul className="p-side-mybook-list-action">
                {previewLink && (
                  <li className="p-side-mybook-list-action__item">
                    <a className="p-side-mybook-list-action__link" href={previewLink} target="_blank">
                      詳しく見る
                    </a>
                  </li>
                )}
                <li className="p-side-mybook-list-action__item">
                  <button
                    className="p-side-mybook-list-action__link is-mybook"
                    type="button"
                    onClick={() => props.handleRemoveMyBook(item.id)}
                  >
                    MyBooksから削除
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
