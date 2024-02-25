import React from "react";
import TopNews from "./TopNews";

const News = () => {
  return (
    <div>
      <p>Latest News</p>
      {/* <div>Here in SPpan tag related news Topics</div> */}
      <div>
        <span>2nd Inn</span>
        <span>IND</span>
        <span>307 &amp; 40/0</span>
        <span>(8 ov, T:192)</span>
        <span>vs</span>
        <span>ENG</span>
      </div>
      <div>
        <img></img>
        <span>
          Van der Dussen 105 in vain as Qalandars slump to fifth defeat
        </span>
        <div>
          <a href="#" title="#" class="#">
            <i class=""></i>
            <span class="">
              <span>Hawk-Eye apologises to PCB over Rossouw error</span>
            </span>
          </a>
        </div>
        <div>
          <a href="#" title="#" class="#">
            <i class=""></i>
            <span class="">
              <span>Hawk-Eye apologises to PCB over Rossouw error</span>
            </span>
          </a>
        </div>{" "}
        <div>
          <a href="#" title="#" class="#">
            <i class=""></i>
            <span class="">
              <span>Hawk-Eye apologises to PCB over Rossouw error</span>
            </span>
          </a>
        </div>{" "}
        <div>
          <a href="#" title="#" class="#">
            <i class=""></i>
            <span class="">
              <span>Hawk-Eye apologises to PCB over Rossouw error</span>
            </span>
          </a>
        </div>
      </div>
      <TopNews />
    </div>
  );
};

export default News;
