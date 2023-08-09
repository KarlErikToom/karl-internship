import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Timer from "../UI/Timer";
import Aos from "aos";
import "aos/dist/aos.css";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [loading, setLoading] = useState(true);
  async function getExplore(event) {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${event}`
    );
    setExploreData(data);
    setLoading(false);
  }
  function loadMore() {
    setItemsToShow((prevItems) => [prevItems + 4]);
  }

  useEffect(() => {
    getExplore(exploreData);
  }, []);
  return (
    <>
      <div>
        <select
          id="filter-items"
          onChange={(event) => getExplore(event.target.value)}
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((element, index) => (
            <div key={index} className="padding skeleton">
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
        : exploreData.slice(0, itemsToShow).map((explore) => {
            const expiryDate = explore.expiryDate
              ? new Date(explore.expiryDate)
              : null;
            const duration = expiryDate
              ? expiryDate.getTime() - Date.now()
              : null;

            return (
              <div 
                key={explore.id}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${explore.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <img className="lazy" src={explore.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {duration !== null ? (
                    <div className="de_countdown">
                      <Timer duration={duration} />
                    </div>
                  ) : null}

                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${explore.nftId}`}>
                      <img
                        src={explore.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{explore.title}</h4>
                    </Link>
                    <div className="nft__item_price">{explore.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{explore.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      <div className="col-md-12 text-center">
        <Link onClick={loadMore} to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
