import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AuthorItems = () => {
  const [author, setAuthor] = useState([]);
  const { authorId } = useParams();
  const [loading, setLoading] = useState(true);

  async function getAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthor(data);
    setLoading(false);
  }

  useEffect(() => {
    getAuthor();
  }, []);
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
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
            : author.nftCollection?.map((nft) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={nft.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy" src={author.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${nft.nftId}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${nft.nftId}`}>
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price}ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{nft.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
