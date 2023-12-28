import { useRef } from 'react'
import './search.css'

export function Search() {
  const searchRef = useRef<HTMLInputElement>(null)

  return (
    <form action="" className="p-search-form">
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
  )
}
