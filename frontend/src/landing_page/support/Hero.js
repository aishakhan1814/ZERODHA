import React from "react";

function Hero() {
  return (
    <div className="container-fluid supportHero px-0">
      <div className="row m-0">
        <div className="col-7">
          <h4>Support Portal</h4>

          <br />
          <br />

          <h5 style={{ lineHeight: "1.8" }}>
            Search for an answer or
            <br />
            browse help topics to create a ticket.
          </h5>

          <nav
            className="navbar"
            style={{
              backgroundColor: "#e3f2fd",
              width: "70%",
            }}
            data-bs-theme="light"
          >
            <div className="container-fluid">
              <a
                className="navbar-brand"
                href="#"
                style={{ color: "gray" }}
              >
                Eg. How do I activate F&O, why is my order getting rejected...
              </a>
            </div>
          </nav>

          <p>
            <a href="#">Track account opening </a>
            <a href="#">Track segment activation </a>
            <a href="#">
              Intraday
              <br />
              margins
            </a>
            <a href="#"> Kite user manual</a>
          </p>
        </div>

        <div className="col-5">
          <h4>Track Tickets</h4>

          <br />
          <br />
          <br />
          <br />

          <h5>Featured</h5>

          <p style={{ lineHeight: "2.2" }}>
            <a href="#">
              1. Current takeovers and Delisting - January 2024
            </a>

            <br />

            <a href="#">
              2. Latest Intraday leverages - M.I.S. and Co.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;