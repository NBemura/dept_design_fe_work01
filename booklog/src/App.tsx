import { useState } from 'react'
// import { MOCK_DATA } from './mockdata' // モックデータの読み込み
import { BookItem } from './types/index' // 型の読み込み
import { Header } from './components/Header/Header'
import { Search } from './components/Search/Search'
import { Booklist } from './components/Booklist/Booklist'
import { SideBookList } from './components/SideBookList/SideBookList'
import './App.css'

// 表示件数（定数）
const DISPLAY_NUM = 10

function App() {
  //2-2）データ受け渡し用のstateを定義
  const [searchItems, setSearchItems] = useState<BookItem[]>([])
  const [totalItems, setTotalItems] = useState<number>(0)
  const [myBookItems, setMyBookItems] = useState<BookItem[]>([])

  //2-3）setSearchItemsを更新するための関数
  const searchItemsUpdate = (newSearchItems: BookItem[], newTotalItems: number) => {
    //2-7）最終的に、子のdata.itemsがsearchItemsにセットされる
    setSearchItems(newSearchItems)
    setTotalItems(newTotalItems)
  }

  // MyBooksに書籍を追加
  const handleAddMyBook = (newMyBook: BookItem) => {
    setMyBookItems((nowMyBook) => {
      // IDが一致する場合はnowMyBookを返す。大量のデータにはfindよりsomeが効率的
      if (!nowMyBook.some((addedMyBook) => addedMyBook.id === newMyBook.id)) {
        // 配列の最後に新しい書籍を追加
        return [...nowMyBook, newMyBook]
      } else {
        alert('その本はすでにマイブックに存在します。')
        return nowMyBook
      }
    })
  }

  // MyBooksの書籍を削除
  const handleRemoveMyBook = (myBookID: string) => {
    setMyBookItems((nowMyBook) => {
      return nowMyBook.filter((addedMyBook) => addedMyBook.id !== myBookID)
    })
  }

  return (
    <>
      <Header />
      <main className="l-main">
        <div className="l-column">
          <div className="l-column-side">
            <aside className="p-side-mybook">
              <h2 className="u-visually-hidden">Mybooks</h2>
              <SideBookList myBookItems={myBookItems} handleRemoveMyBook={(item) => handleRemoveMyBook(item)} />
            </aside>
          </div>
          <div className="l-column-main">
            <section className="p-search">
              <h2 className="u-visually-hidden">書籍検索</h2>
              {/* 2-4）Propsで子に関数をわたす。displayNumという名前で定数DISPLAY_NUMを渡す */}
              <Search onGetBooks={searchItemsUpdate} displayNum={DISPLAY_NUM} />
              {totalItems > 0 && (
                <>
                  <p className="p-search__message">
                    {totalItems}件の書籍が見つかりました。
                    <br />
                    そのうち{DISPLAY_NUM}件を表示します。
                  </p>
                  {/* 2-8）Propsで子にsearchItemsをわたす */}
                  {/* 引数をもった関数を子に渡す */}
                  <Booklist items={searchItems} handleAddMyBook={(item) => handleAddMyBook(item)} />
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
