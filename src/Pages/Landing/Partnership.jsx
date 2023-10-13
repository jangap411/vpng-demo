import React from "react";
import { Carousel } from "react-responsive-carousel";
const Partnership = () => {
  return (
    <>
      {/* <script
        src="https://code.jquery.com/jquery-2.2.0.min.js"
        type="text/javascript"
      ></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
      <link
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
        rel="stylesheet"
      /> */}

      <div className="container">
        <h2>Our Partners</h2>
        <Carousel
          showArrows={true}
          //   onChange={onChange}
          //   onClickItem={onClickItem}
          //   onClickThumb={onClickThumb}
        >
          <div>
            <img
              src="https://image.freepik.com/free-vector/luxury-letter-e-logo-design_1017-8903.jpg"
              alt="brian bell"
            />
            <p>Brian Bell Group1</p>
          </div>
          <div>
            <img
              src="https://image.freepik.com/free-vector/luxury-letter-e-logo-design_1017-8903.jpg"
              alt="brian bell"
            />
            <p>Brian Bell Group2</p>
          </div>
          <div>
            <img
              src="https://image.freepik.com/free-vector/luxury-letter-e-logo-design_1017-8903.jpg"
              alt="brian bell"
            />
            <p>Brian Bell Group3</p>
          </div>
        </Carousel>
        {/* <section className="customer-logos slider">
        </section> */}
      </div>
    </>
  );
};

export default Partnership;
