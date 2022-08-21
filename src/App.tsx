import { useEffect, useState } from "react";
import "./styles.css";

type Product = {
  id: number;
  name: string;
  photo: string;
  color: string;
  dimensions: ProductDimensions;
  sku: string;
};

type ProductDimensions = {
  width: number;
  height: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getProducts() {
      fetch("http://localhost:8080/products")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }
    getProducts();
  }, []);

  const lowerCaseSearch = search.toLowerCase();

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(lowerCaseSearch));

  return (
    <>
      <div className="search-box">
        <input 
          id="search-bar" 
          type="text" 
          placeholder="Digite o nome do produto aqui."
          value={search}
          onChange={(ev) => setSearch(ev.target.value)} />
      </div>

      <table>
        <thead>
          <tr>
            <th scope="col">nome</th>
            <th scope="col">foto</th>
            <th scope="col">cor</th>
            <th scope="col">dimensões</th>
            <th scope="col">SKU</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts?.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <img src={product.id === 1 ? require('./assets/notebook-test.png'):
                 require('./assets/tv-test.png')}
              alt="" 
              />
              </td>
              <td>{product.color}</ td>
              <td>{`${product.dimensions.width} x ${product.dimensions.height}`}</td>
              <td>{product.sku}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
