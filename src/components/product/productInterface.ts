interface createProduct {
  name: string;
  price: number;
}

interface product {
  id: number;
  name: string;
  price: number;
}
interface productSerialized {
  id: number;
  name: string;
  price: number;
}
export { createProduct, product, productSerialized };
