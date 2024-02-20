import { BookItem } from '../../types/index' // 型の読み込み
import './sidebooklist.css'

type SideBookListProps = {
  myBookItems: BookItem[]
}

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
              {previewLink && (
                <div className="p-side-mybook-list-action">
                  <a className="p-side-mybook-list-action__link" href={previewLink} target="_blank">
                    詳しく見る
                  </a>
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
