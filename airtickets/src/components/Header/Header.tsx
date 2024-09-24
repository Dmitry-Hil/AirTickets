import './Header.scss'

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div className="wrapper">
                        <img className="logo" src="/plane.svg" alt="plane" />
                        <h1 className="title">Поиск авиабилетов</h1>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header