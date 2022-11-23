import { getProductsInCollection } from "../lib/shopify"
import ProductList from "../components/ProductList"
import Hero from "../components/Hero"
import Head from "next/head"

// we could make our Head dynamic by creating a new SEO component and passing in props (data) as the title.
// lines 14 - 38 give us all the SEO we need for a perfect score. 

export default function Home({ products }) {
  return (
    <div className="">
      <Head>
        <title>Modern eCommerce Course</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          http-equiv="Content-Type"
          content="text/html; charset=ISO-8859-1"
        />
        <meta
          name="description"
          content="Build + Deploy your first Headless Shopify Storefront with Next.js + Tailwind in as little as a day."
        />
        <meta property="og:title" content="Modern eCommerce Course" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content=" https://la-psicologa-perinatal.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://la-psicologa-perinatal.vercel.app/images/la-psicologa.png"
        />
        <meta
          property="og:description"
          content="Build + Deploy your first Headless Shopify Storefront with Next.js + Tailwind in as little as a day"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Modern eCommerce Course" />
      </Head>
      <Hero />
      <ProductList products={products} />
    </div>
  ) 
} 

export async function getStaticProps() {
  const products = await getProductsInCollection()

  return {
    props: {products}, //will be passed to the page component as props
  }
}
