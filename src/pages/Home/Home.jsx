import Banner from "./Banner";
import FeaturedRooms from "./FeaturedRooms";
import Map from "./Map";
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - Lodgio</title>
        <meta
          name="description"
          content="Welcome to Lodgio, your home away from home."
        />
      </Helmet>
      <Banner />
      <FeaturedRooms />
      <Map />
    </>
  );
};

export default Home;
