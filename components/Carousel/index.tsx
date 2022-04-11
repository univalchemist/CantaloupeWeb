// https://github.com/leandrowd/react-responsive-carousel

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';

import {images} from '../../assets/images';

import * as Styled from './styles';

const Slider = () => (
  <Carousel
    // autoPlay
    emulateTouch
    infiniteLoop
    interval={3000}
    showThumbs={false}
    showArrows={false}
    showStatus={false}
    useKeyboardArrows>
    <Styled.Slide>
      <img src={images.homeCarousel01} alt="Cantaloupe More Card" />
      <Styled.Title>Reload your pass with a credit or debit card</Styled.Title>
    </Styled.Slide>
    <Styled.Slide>
      <img src={images.homeCarousel02} alt="Cantaloupe Payment Options" />
      <Styled.Title>Your More Pass Works with Apple Wallet</Styled.Title>
    </Styled.Slide>
    <Styled.Slide>
      <img src={images.homeCarousel03} alt="cpay Card" />
      <Styled.Title>Add a CPay pass to pay with digital tokens</Styled.Title>
    </Styled.Slide>
    <Styled.Slide>
      <img src={images.homeCarousel04} alt="Google Wallet/Apple Pay Card" />
      <Styled.Title>View your transactions, get help, and more </Styled.Title>
    </Styled.Slide>
  </Carousel>
);

export default Slider;
