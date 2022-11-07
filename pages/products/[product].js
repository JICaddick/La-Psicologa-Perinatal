// We're using this page to get the static paths and then we're getting the static props that we're then passing to our product page function through which we're passing the prodcut to the product page content component. 
import ProductPageContent from "../../components/ProductPageContent";
import { getAllProducts, getProduct } from "../../lib/shopify";
//deleted products from shopify
export default function ProductPage({ product }) {
  return (
    <div className="min-h-screen py-12 sm:pt-20 bg-background-color">
      <ProductPageContent product={product} />
    </div>
  );
}

export async function getStaticPaths() {
  const products = await getAllProducts();

  const paths = products.map((item) => {
    const product = String(item.node.handle);

    return {
      params: { product },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await getProduct(params.product);

  return {
    props: {
      product,
    },
  };
}

// deploy often and early to make sure nothing's broken.