import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
function Arrow(props) {
  const { className, style, onClick } = props;
  const arrowStyle = {
    ...style,
    color: "#ffffff",
  };
  return <div className={className} style={arrowStyle} onClick={onClick} />;
}

function Carousel() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCollection() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
    setLoading(false)
  }
  useEffect(() => {
    fetchCollection();
  }, []);
  return (
    <>
      {" "}
      {loading ? (
        new Array(4).fill(0).map((element, index) => (
          <div key={index}  className="padding skeleton">
            <div className="nft_coll">
              <div className="nft_wrap">
                <div className="img-fluid--skeleton"></div>
              </div>
              <div className="nft_coll_pp">
                <div className="pp-coll--skeleton"></div>
              </div>
              <div className="nft_coll_info">
                <div className="collection--skeleton"></div>
                <div className="code--skeleton"></div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Slider {...settings}>
          {collections.map((collection) => (
            <div key={collection.id} className="padding ">
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img
                      src={collection.nftImage}
                      className="lazy img-fluid"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img
                      className="lazy pp-coll"
                      src={collection.authorImage}
                      alt=""
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}

export default Carousel;

/*const [collections, setCollections] = useState([]);

  async function fetchCollection() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
  }
  console.log(collections);
  useEffect(() => {
    fetchCollection();
  }, []);*/

/*{collections.map((collection) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={collection.id}
            >
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img
                      src={collection.nftImage}
                      className="lazy img-fluid"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img
                      className="lazy pp-coll"
                      src={collection.authorImage}
                      alt=""
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
                </div>
              </div>
            </div>
          ))}*/
