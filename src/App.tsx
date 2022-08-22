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
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getProducts() {
      fetch("https://sistema-de-cotacao-demo.herokuapp.com/products")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }
    getProducts();
  }, []);

  const lowerCaseSearch = search.toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(lowerCaseSearch)
  );

  return (
    <div className="container">
      <div className="search-box">
        <input
          id="search-bar"
          type="text"
          placeholder="Digite o nome do produto aqui."
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </div>

      <div className="cardContainer">
        {filteredProducts.map((product) => (
            <div className="card" key={product.id}>
              <img src={require('' + product.photo) } alt="" />
              <div className="descriptionContainer">
                <p className="title">
                  {`${product.name} ${product.color} 
                ${product.dimensions.width} x ${product.dimensions.height}`}
                </p>
                <p className="price">{product.sku}</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
