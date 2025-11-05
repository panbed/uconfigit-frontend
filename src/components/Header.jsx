function Header({ headerText }) {

  return (
    <>
      <header className="flex-row" role='banner'>
        <img src="udoit-logo.svg" alt="UDOIT Logo" />
        <h1>{headerText ? headerText : "Placeholder"}</h1>
      </header>
    </>
  )
}

export default Header