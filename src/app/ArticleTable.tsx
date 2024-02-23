"use client";
import { countProduct, getProducts } from "@/axios/index";
import { Iarticle } from "@/interface/Article";
import { useEffect, useState } from "react";

export default function ArticleTable() {
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Iarticle | null>(null);
  const [products, setProduct] = useState<Iarticle[]>([]);
  const [nbProduct, setNbProduct] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  


  useEffect(() => {
    fetchProducts(currentPage);
    fetchNbProduct();
  }, []);

  const handleOrderButtonClick = (article: Iarticle) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handlePaymentButtonClick = () => {
    if (selectedArticle) {
      const updatedProducts = products.map((product: Iarticle) => {
        if (product.id === selectedArticle.id) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProduct(updatedProducts);
      setShowModal(false);
    }
  };

  const fetchProducts = async (currentPage: number | undefined) => {
    try {
      const products = await getProducts(currentPage, 3);
      console.log("Products:", products.data);
      setProduct(products.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchNbProduct = () => {
    countProduct()
    .then((res)=>{
      console.log("Nombre de produits total:", res.data.count);
      setNbProduct(res.data.count);
    }).catch((err) => console.error("Error fetching Nbproducts:", err));
  }

const handleNextPage = () => {
  setCurrentPage((currentPage) => currentPage + 1);
};

const handlePrevPage = () => {
  setCurrentPage((currentPage) => currentPage - 1);
};

useEffect(() => {
  fetchProducts(currentPage);
}, [currentPage]);

  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>Nom</th>
            <th style={headerStyle}>Quantité</th>
            <th style={headerStyle}>Description</th>
            <th style={headerStyle}>Image</th>
            <th style={headerStyle}>Prix</th>
            <th style={headerStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) => product.quantity > 0)
            .map((article) => (
              <tr key={article.id}>
                <td style={cellStyle}>{article.name}</td>
                <td style={cellStyle}>{article.quantity}</td>
                <td style={cellStyle}>{article.description}</td>
                <td style={cellStyle}>
                  {article?.image && (
                    <img
                      src={`http://localhost:3001/image/${article.image}?width=100&height=100`}
                    />
                  )}
                </td>
                <td style={cellStyle}>{article.price} euros</td>
                <td style={cellStyle}>
                  <button onClick={() => handleOrderButtonClick(article)}>
                    Commander
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <div style={{float:"right",marginRight:30,marginTop:15}}>
          {currentPage > 1 && <button onClick={handlePrevPage}>Prev</button>}
          {(currentPage + 3) <nbProduct  && <button onClick={handleNextPage}>Next</button>}
        </div>
      </div>
      
      <div
        style={{
          position: "fixed",
          top: "45%",
          right: "50px",
          transform: "translateY(-50%)",
        }}
      ></div>
      {showModal && (
        <div style={modalContainerStyle}>
          <div style={modalContentStyle}>
            <h2>Confirmation de la commande</h2>
            <p>Article sélectionné: {selectedArticle?.name}</p>
            <div style={buttonContainerStyle}>
              <button
                style={confirmButtonStyle}
                onClick={handlePaymentButtonClick}
              >
                Payer
              </button>
              <button
                style={cancelButtonStyle}
                onClick={() => setShowModal(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const headerStyle: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ddd",
  backgroundColor: "#f2f2f2",
  textAlign: "left",
};

const cellStyle: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const imageStyle: React.CSSProperties = {
  maxWidth: "100px",
  maxHeight: "100px",
};

const modalContainerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
};

const buttonContainerStyle: React.CSSProperties = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
};

const confirmButtonStyle: React.CSSProperties = {
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "8px 16px",
  cursor: "pointer",
  marginRight: "10px",
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "8px 16px",
  cursor: "pointer",
};
