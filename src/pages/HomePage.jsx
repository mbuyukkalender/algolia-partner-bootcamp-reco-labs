/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/first */
/* eslint-disable import/dynamic-import-chunkname */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
// This is the homepage, which you see when you first visit the site.
// By default it contains some banners and carousels

import { lazy, Suspense } from 'react';

import Loader from '@/components/loader/Loader';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

import { framerMotionPage } from '@/config/animationConfig';

// recoil import
import { useRecoilValue } from 'recoil';

// components import
const CustomHomeBanners = lazy(() =>
  import('@/components/banners/HomeBanners')
);
const FederatedSearch = lazy(() =>
  import('@/components/federatedSearch/FederatedSearch')
);

// const HomeCarousel = lazy(() => import('@/components/carousels/HomeCarousel'));

// should carousel be shown or not and config for carousel
// import { carouselConfig } from '@/config/carouselConfig';

//  should federated search be shown or not
import {
  shouldHaveFederatedSearch,
  // shouldHaveCarousels,
} from '@/config/featuresConfig';

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

import { searchClientCreds, mainIndex } from '@/config/algoliaEnvConfig';
import algoliarecommend from '@algolia/recommend';
import {
  TrendingItems
} from '@algolia/recommend-react';
import RelatedItem from '@/components/recommend/RelatedProducts';

const HomePage = () => {
  // Boolean value which determines if federated search is shown or not, default is false
  const isFederated = useRecoilValue(shouldHaveFederatedSearch);
  // const isCarousel = useRecoilValue(shouldHaveCarousels);
  const isFederatedOpen = useRecoilValue(shouldHaveOpenFederatedSearch);

  // Prevent body from scrolling when panel is open
  // usePreventScrolling(isFederatedOpen);

  const index = useRecoilValue(mainIndex);
  // define the client for using Recommend
  const recommendClient = algoliarecommend(
    searchClientCreds.appID,
    searchClientCreds.APIKey
  );

  

  return (
    // Framer motion wrapper
    <motion.div
      className="homepage"
      // initial state
      initial={framerMotionPage.initial}
      // actual animation
      animate={framerMotionPage.animate}
      // everything the animation needs to function
      variants={framerMotionPage}
      // what to do when unmounted
      exit={framerMotionPage.exit}
      // duration, smoothness etc.
      transition={framerMotionPage.transition}
    >
      {isFederated && isFederatedOpen && (
        <AnimatePresence>
          {/* Loads federated search if isFederated is true */}
          <Suspense fallback={<Loader />}>
            <FederatedSearch />
          </Suspense>
        </AnimatePresence>
      )}

      {/* Load custom banners */}
      <Suspense fallback={<Loader />}>
        <CustomHomeBanners />
      </Suspense>

      {/* ==================================================================== */}
      {/*                           PARTNER BOOTCAMP                           */}
      {/* ==================================================================== */}

      {/* ________________ LAB N°3 : TRENDING ITEMS CAROUSEL _________________ */}
      
      <div className='home-carousel'>
        <h3>Trending Items</h3>
        <div className='recommend'> 
          <TrendingItems
            recommendClient={recommendClient}
            indexName={index}
            itemComponent={RelatedItem}
            maxRecommendations={12}
          />
        </div>
      </div>
     
      {/* ____________________________________________________________________ */}
        
    </motion.div>
  );
};

export default HomePage;
