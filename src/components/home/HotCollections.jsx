import React  from "react";
import Carousel from "../UI/Carousel";
import Aos from "aos";
import "aos/dist/aos.css";

const HotCollections = () => {
   

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-Aos="fade" data-aos-once="true">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Carousel />
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
