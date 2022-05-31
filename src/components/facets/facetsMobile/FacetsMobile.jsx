// Renders Facets component for mobile viewport
// import framer motion
import { motion } from 'framer-motion';
import { framerMotionTransition } from '@/config/animationConfig';

import GenericRefinementList from '@/components/facets/Facets';

const FacetsMobile = ({ isMenuOpen }) => {
  return (
    <motion.div
      animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
      transition={framerMotionTransition}
      className="srp-container__facets-mobile"
    >
      <GenericRefinementList />
    </motion.div>
  );
};

export default FacetsMobile;
