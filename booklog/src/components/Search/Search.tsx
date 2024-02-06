import { BookItem } from '../../types/index' // 型の読み込み
import { useEffect, useRef, useState } from 'react'
import './search.css'

//Propsで渡されるデータの型
type SearchProps = {
  handleSearchItemsUpdate: (newSearchItems: BookItem[], newTotalItems: number, newDisplayNum: number) => void
}

// 2-5）Propsで親で定義した関数を受け取る
export function Search(props: SearchProps) {
  const searchRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState<string>('')

  // 1-1）検索ボタン
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // queryにinputの文字列をセット。undefinedは許容できないので、undefined、nullの場合空文字列をセット
    setQuery(searchRef.current?.value ?? '')
  }

  // 1-３）API情報を取得しJSONに加工
  const getBooks = async () => {
    // 表示件数
    const displayNum = 10

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/?q="${query}"&maxResults=${displayNum}`)

      if (!response.ok) {
        throw new Error('APIからデータを取得できませんでした。')
      }

      // JSONの型はどうすれば良い？？
      const data = await response.json()
      // 2-1）dataを親に渡したい！→親にデータを渡すには、親で関数を定義
      // 2-6）親で定義した関数を実行。引数に親に渡したい値を入れる
      props.handleSearchItemsUpdate(data.items, data.totalItems, displayNum)
    } catch (error) {
      console.error('ネットワークエラーです。', error)
    }
  }

  // 1-2）queryが更新されたら実行。
  // レンダリングごとにAPIが動くと困るのでuseEffectを使用
  useEffect(() => {
    // 初回ロードでも動いてしまうため、queryが空でなければgetBooksを実行
    if (query.trim() !== '') {
      // voidでPromiseの結果の無視を明示
      void getBooks()
    }
  }, [query])

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
