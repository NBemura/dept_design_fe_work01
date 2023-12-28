import { useState } from 'react'
import { MOCK_DATA } from './mockdata' // モックデータの読み込み
import { BookItem } from './types/index' // 型の読み込み
import { Header } from './components/Header/Header'
import { Search } from './components/Search/Search'
import { Booklist } from './components/Booklist/Booklist'
import './App.css'

function App() {
  const [items, setItems] = useState<BookItem[]>(MOCK_DATA.items)
  //複数のデータを格納(念の為複数形に変更)。BookItemの型も配列を指定。

  return (
    <>
      <Header />
      <main className="l-main">
        <div className="u-container">
          <Search />
          {/* Propsでデータをitemsという名前でコンポーネントに受け渡す */}
          <Booklist items={items} />
        </div>
      </main>
    </>
  )
}

export default App
