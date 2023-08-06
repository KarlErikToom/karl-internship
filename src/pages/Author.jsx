import React, { useEffect, useRef, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const [author, setAuthor] = useState([]);
  const { authorId } = useParams();
  const [localFollowers, setLocalFollowers] = useState(0);
  const [loading, setLoading] = useState(true);
  async function getAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthor(data);
    setLocalFollowers(data.followers);
    setLoading(false);
  }

  function handleFollowClick() {
    const followBtn = document.querySelector(".follow");
    const unfollowBtn = document.querySelector(".unfollow");
    setLocalFollowers((prevFollowers) => prevFollowers + 1);
    followBtn.style.display = "none";
    unfollowBtn.style.display = "block";
  }

  useEffect(() => {
    getAuthor();
  }, []);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <div className="author__img--skeleton2"></div>
                      ) : (
                          <img src={author.authorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        {loading ? (
                          <h4>
                            <div className="author__name--skeleton"></div>
                            <div className="code--skeleton"></div>
                            <div className="author__wallet--skeleton"></div>
                          </h4>
                        ) : (
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    {loading ? (
                      <div className="de-flex-col">
                        <div className="author__name--skeleton"></div>
                        <div className="btn--skeleton"></div>
                      </div>
                    ) : (
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {localFollowers} followers
                        </div>
                        <button
                          onClick={handleFollowClick}
                          className="btn-main follow"
                        >
                          Follow
                        </button>
                        <button to="#" className="btn-main unfollow">
                          Unfollow
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
