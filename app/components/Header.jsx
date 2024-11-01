export default function Header(){
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/watch-list" className="hover:underline">Form</a>
                        </li>
                        <li>
                            <a href="/item-list" className="hover:underline">Item list</a>
                        </li>
                        <li>
                            <a href="/search-item" className="hover:underline">Search</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}