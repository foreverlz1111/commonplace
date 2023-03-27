import './App.css';
import {useState} from "react";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                <FilterableProductTable products={PRODUCTS}/>
            </header>
        </div>
    );
}

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
]

function ProductCategoryRow({category}) {
    //品种
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    )
}

function ProductRow({product}) {
    //大类
    const name = product.stocked ? product.name :
        <span style={{color: "red"}}>
            {product.name}
        </span>
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}

function ProductTable({products, filterText, inStockOnly}) {
    const rows = []
    let lastCategory = null

    products.forEach((product) => {
        if (product.name.toLowerCase().indexOf(
            filterText.toLowerCase()
        ) === -1
        ) {
            return;
        }
        if (inStockOnly && !product.stocked) {
            return;
        }
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow category={product.category}
                                    key={product.category}/>
            )
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name}/>
        )
        lastCategory = product.category
    })
    return (
        <table>
            <thead>
            <tr>
                <th> Name</th>
                <th> Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
    return (
        <form>
            <input type="text"
                   placeholder="search..."
                   value={filterText}
                   onChange={(e) => onFilterTextChange(e.target.value)}/>
            <label>
                <br/>
                <input type="checkbox"
                       checked={inStockOnly}
                       onChange={(e) => onInStockOnlyChange(e.target.checked)}/>
                {' '}
                Only show products in stock
            </label>
        </form>
    )
}

function FilterableProductTable({products}) {
    const [filterText, setFilterText] = useState("")
    const [inStockOnly, setInStockOnly] = useState(false)
    return (
        <div>
            <SearchBar filterText={filterText}
                       inStockOnly={inStockOnly}
                       onFilterTextChange={setFilterText}
                       onInStockOnlyChange={setInStockOnly}></SearchBar>
            <ProductTable products={products}
                          filterText={filterText}
                          inStockOnly={inStockOnly}></ProductTable>
        </div>
    )
}

export default App;
