import styled from "styled-components";

export const StyledProduct = styled.div`
  #products-main-row {
    margin-top: 50px;
  }

  .product-price {
    font-weight: bold;
    font-size: 1rem;
    color: forestgreen;
  }

  .product-card {
    margin: 15px;
    overflow: auto;
    height: 31rem;
    font-size: 0.82rem;
  }

  .add-to-cart-button {
    font-size: 0.9rem;
    padding: 0.2rem;
    margin: 0.1rem;
    border-radius: 0.5rem;
    border: 0.1rem #404040 solid;
    background-color: #f0c040;
    cursor: pointer;
  }
`;
