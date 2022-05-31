// This component renders a footer in Main.jsx, which can receive props if needed
// NB it is normally (and currently) a screenshot image, stored in assets

import footer from '@/assets/homepage/footer.png';

const Footer = (props) => {
  return (
    <div className="footer">
      <img src={footer} alt="" />
    </div>
  );
};

export default Footer;
