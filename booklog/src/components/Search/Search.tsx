import { BookItem } from '../../types/index' // 型の読み込み
import { useRef } from 'react'
import './search.css'

//Propsで渡されるデータの型
type SearchProps = {
  displayNum: number
  onFetchBooks: (newSearchItems: BookItem[], newTotalItems: number) => void
}

//JSONの型
type Result = {
  kind: string
  totalItems: number
  items: BookItem[]
}

// 2-5）Propsで親で定義した関数を受け取る
export function Search(props: SearchProps) {
  const searchRef = useRef<HTMLInputElement>(null)

  // 1-1）検索ボタン
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void getBooks()
  }

  // 1-2）API情報を取得しJSONに加工
  const getBooks = async () => {
    // queryにinputの文字列をセット。undefinedは許容できないので、undefined、nullの場合空文字列をセット
    // queryはリクエストのタイミングでわかれば良いので、stateで管理しなくてもOK
    const query = searchRef.current?.value ?? ''
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/?q="${query}"&maxResults=${props.displayNum}`,
      )

      if (!response.ok) {
        console.error('response.ok:', response.ok)
        console.error('response.status:', response.status)
        console.error('response.statesText:', response.statusText)
        throw new Error(response.statusText)
      }

      // ひとまず型アサーションで対処
      const data = (await response.json()) as Result
      console.log('data: ', data)
      // 2-1）dataを親に渡したい！→親にデータを渡すには、親で関数を定義
      // 2-6）親で定義した関数を実行。引数に親に渡したい値を入れる
      props.onFetchBooks(data.items, data.totalItems)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form action="" className="p-search-form" onSubmit={handleSearchSubmit}>
        <div className="p-search-form__box">
          <label htmlFor="p-search-form__book" className="p-search-form__label u-visually-hidden">
            書籍検索
          </label>
          <input
            type="search"
            id="p-search-form__book"
            className="p-search-form__input"
            placeholder="キーワードを入力して書籍を検索"
            ref={searchRef}
          />
          <button type="submit" className="p-search-form__button">
            search
          </button>
        </div>
      </form>
    </>
  )
}
