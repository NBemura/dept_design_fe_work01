import { Readingtimer } from '../Readingtimer/Readingtimer'
import './header.css'

export function Header() {
  return (
    <header className="l-header">
      <h1 className="l-header__logo">Booklog</h1>
      <Readingtimer />
    </header>
  )
}
