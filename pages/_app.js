import 'tailwindcss/tailwind.css'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import Layout from '../components/Layout'
import ShopProvider from '../context/shopContext'
// using the router allows our dynamic product pages to add invividual products to the cart. We don't need to save the state on each one. 
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  
  const router = useRouter()
// setting the key to the route will allow us to keep the state of the cart on each page. State management won't get confused when we switch between pages.
  return (
    <ShopProvider>
      <Layout>
        <Component {...pageProps} key ={router.asPath}/>
      </Layout>
    </ShopProvider>
  )
}

export default MyApp
