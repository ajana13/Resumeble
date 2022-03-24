import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Wave from "react-wavify";
import heroVideo from "../profile/Videos/space3.mp4";
import homePageTitle from "../profile/assets/homepagetitle.svg";

import './Landing.css';


const Landing = ({ auth, history }) => {
  if (auth.isAuthenticated) {
    history.push("/dashboard");
  }


  return (
    <div className="Landing">
    
   

      <div className="header-profile-main">
        <Wave
          fill="#FA7268"
          paused={false}
          options={{
            height: 60,
            amplitatude: 40,
            speed: 0.2,
            points: 4,
          }}
        />

        <div className="wave-overlap3">
          <Wave
            fill="#e34c67"
            paused={false}
            options={{
              height: 90,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>

        <div className="wave-overlap4">
          <Wave
            fill="#C62368"
            paused={false}
            options={{
              height: 110,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>
      </div>

      <div className="HomeContentLanding">
        <h1 className="title-text">Welcome To</h1>

        <svg id="logo" width="791" height="112" viewBox="0 0 791 112" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54.936 109L31.032 67.96H15.192V109H2.08801V8.632H34.488C42.072 8.632 48.456 9.928 53.64 12.52C58.92 15.112 62.856 18.616 65.448 23.032C68.04 27.448 69.336 32.488 69.336 38.152C69.336 45.064 67.32 51.16 63.288 56.44C59.352 61.72 53.4 65.224 45.432 66.952L70.632 109H54.936ZM15.192 57.448H34.488C41.592 57.448 46.92 55.72 50.472 52.264C54.024 48.712 55.8 44.008 55.8 38.152C55.8 32.2 54.024 27.592 50.472 24.328C47.016 21.064 41.688 19.432 34.488 19.432H15.192V57.448Z" stroke="white" stroke-width="3"/>
<path d="M161.697 66.52C161.697 69.016 161.553 71.656 161.265 74.44H98.1934C98.6734 82.216 101.313 88.312 106.113 92.728C111.009 97.048 116.913 99.208 123.825 99.208C129.489 99.208 134.193 97.912 137.937 95.32C141.777 92.632 144.465 89.08 146.001 84.664H160.113C158.001 92.248 153.777 98.44 147.441 103.24C141.105 107.944 133.233 110.296 123.825 110.296C116.337 110.296 109.617 108.616 103.665 105.256C97.8094 101.896 93.2014 97.144 89.8414 91C86.4814 84.76 84.8014 77.56 84.8014 69.4C84.8014 61.24 86.4334 54.088 89.6974 47.944C92.9614 41.8 97.5214 37.096 103.377 33.832C109.329 30.472 116.145 28.792 123.825 28.792C131.313 28.792 137.937 30.424 143.697 33.688C149.457 36.952 153.873 41.464 156.945 47.224C160.113 52.888 161.697 59.32 161.697 66.52ZM148.161 63.784C148.161 58.792 147.057 54.52 144.849 50.968C142.641 47.32 139.617 44.584 135.777 42.76C132.033 40.84 127.857 39.88 123.249 39.88C116.625 39.88 110.961 41.992 106.257 46.216C101.649 50.44 99.0094 56.296 98.3374 63.784H148.161Z" stroke="white" stroke-width="3"/>
<path d="M206.93 110.296C200.882 110.296 195.458 109.288 190.658 107.272C185.858 105.16 182.066 102.28 179.282 98.632C176.498 94.888 174.962 90.616 174.674 85.816H188.21C188.594 89.752 190.418 92.968 193.682 95.464C197.042 97.96 201.41 99.208 206.786 99.208C211.778 99.208 215.714 98.104 218.594 95.896C221.474 93.688 222.914 90.904 222.914 87.544C222.914 84.088 221.378 81.544 218.306 79.912C215.234 78.184 210.482 76.504 204.05 74.872C198.194 73.336 193.394 71.8 189.65 70.264C186.002 68.632 182.834 66.28 180.146 63.208C177.554 60.04 176.258 55.912 176.258 50.824C176.258 46.792 177.458 43.096 179.858 39.736C182.258 36.376 185.666 33.736 190.082 31.816C194.498 29.8 199.538 28.792 205.202 28.792C213.938 28.792 220.994 31 226.37 35.416C231.746 39.832 234.626 45.88 235.01 53.56H221.906C221.618 49.432 219.938 46.12 216.866 43.624C213.89 41.128 209.858 39.88 204.77 39.88C200.066 39.88 196.322 40.888 193.538 42.904C190.754 44.92 189.362 47.56 189.362 50.824C189.362 53.416 190.178 55.576 191.81 57.304C193.538 58.936 195.65 60.28 198.146 61.336C200.738 62.296 204.29 63.4 208.802 64.648C214.466 66.184 219.074 67.72 222.626 69.256C226.178 70.696 229.202 72.904 231.698 75.88C234.29 78.856 235.634 82.744 235.73 87.544C235.73 91.864 234.53 95.752 232.13 99.208C229.73 102.664 226.322 105.4 221.906 107.416C217.586 109.336 212.594 110.296 206.93 110.296Z" stroke="white" stroke-width="3"/>
<path d="M324.213 30.088V109H311.109V97.336C308.613 101.368 305.109 104.536 300.597 106.84C296.181 109.048 291.285 110.152 285.909 110.152C279.765 110.152 274.245 108.904 269.349 106.408C264.453 103.816 260.565 99.976 257.685 94.888C254.901 89.8 253.509 83.608 253.509 76.312V30.088H266.469V74.584C266.469 82.36 268.437 88.36 272.373 92.584C276.309 96.712 281.685 98.776 288.501 98.776C295.509 98.776 301.029 96.616 305.061 92.296C309.093 87.976 311.109 81.688 311.109 73.432V30.088H324.213Z" stroke="white" stroke-width="3"/>
<path d="M441.234 28.648C447.378 28.648 452.85 29.944 457.65 32.536C462.45 35.032 466.242 38.824 469.026 43.912C471.81 49 473.202 55.192 473.202 62.488V109H460.242V64.36C460.242 56.488 458.274 50.488 454.338 46.36C450.498 42.136 445.266 40.024 438.642 40.024C431.826 40.024 426.402 42.232 422.37 46.648C418.338 50.968 416.322 57.256 416.322 65.512V109H403.362V64.36C403.362 56.488 401.394 50.488 397.458 46.36C393.618 42.136 388.386 40.024 381.762 40.024C374.946 40.024 369.522 42.232 365.49 46.648C361.458 50.968 359.442 57.256 359.442 65.512V109H346.338V30.088H359.442V41.464C362.034 37.336 365.49 34.168 369.81 31.96C374.226 29.752 379.074 28.648 384.354 28.648C390.978 28.648 396.834 30.136 401.922 33.112C407.01 36.088 410.802 40.456 413.298 46.216C415.506 40.648 419.154 36.328 424.242 33.256C429.33 30.184 434.994 28.648 441.234 28.648Z" stroke="white" stroke-width="3"/>
<path d="M566.697 66.52C566.697 69.016 566.553 71.656 566.265 74.44H503.193C503.673 82.216 506.313 88.312 511.113 92.728C516.009 97.048 521.913 99.208 528.825 99.208C534.489 99.208 539.193 97.912 542.937 95.32C546.777 92.632 549.465 89.08 551.001 84.664H565.113C563.001 92.248 558.777 98.44 552.441 103.24C546.105 107.944 538.233 110.296 528.825 110.296C521.337 110.296 514.617 108.616 508.665 105.256C502.809 101.896 498.201 97.144 494.841 91C491.481 84.76 489.801 77.56 489.801 69.4C489.801 61.24 491.433 54.088 494.697 47.944C497.961 41.8 502.521 37.096 508.377 33.832C514.329 30.472 521.145 28.792 528.825 28.792C536.313 28.792 542.937 30.424 548.697 33.688C554.457 36.952 558.873 41.464 561.945 47.224C565.113 52.888 566.697 59.32 566.697 66.52ZM553.161 63.784C553.161 58.792 552.057 54.52 549.849 50.968C547.641 47.32 544.617 44.584 540.777 42.76C537.033 40.84 532.857 39.88 528.249 39.88C521.625 39.88 515.961 41.992 511.257 46.216C506.649 50.44 504.009 56.296 503.337 63.784H553.161Z" stroke="white" stroke-width="3"/>
<path d="M597.098 44.776C599.786 40.072 603.722 36.232 608.906 33.256C614.09 30.28 619.994 28.792 626.618 28.792C633.722 28.792 640.106 30.472 645.77 33.832C651.434 37.192 655.898 41.944 659.162 48.088C662.426 54.136 664.058 61.192 664.058 69.256C664.058 77.224 662.426 84.328 659.162 90.568C655.898 96.808 651.386 101.656 645.626 105.112C639.962 108.568 633.626 110.296 626.618 110.296C619.802 110.296 613.802 108.808 608.618 105.832C603.53 102.856 599.69 99.064 597.098 94.456V109H583.994V2.44H597.098V44.776ZM650.666 69.256C650.666 63.304 649.466 58.12 647.066 53.704C644.666 49.288 641.402 45.928 637.274 43.624C633.242 41.32 628.778 40.168 623.882 40.168C619.082 40.168 614.618 41.368 610.49 43.768C606.458 46.072 603.194 49.48 600.698 53.992C598.298 58.408 597.098 63.544 597.098 69.4C597.098 75.352 598.298 80.584 600.698 85.096C603.194 89.512 606.458 92.92 610.49 95.32C614.618 97.624 619.082 98.776 623.882 98.776C628.778 98.776 633.242 97.624 637.274 95.32C641.402 92.92 644.666 89.512 647.066 85.096C649.466 80.584 650.666 75.304 650.666 69.256Z" stroke="white" stroke-width="3"/>
<path d="M694.411 2.44V109H681.307V2.44H694.411Z" stroke="white" stroke-width="3"/>
<path d="M788.744 66.52C788.744 69.016 788.6 71.656 788.312 74.44H725.24C725.72 82.216 728.36 88.312 733.16 92.728C738.056 97.048 743.96 99.208 750.872 99.208C756.536 99.208 761.24 97.912 764.984 95.32C768.824 92.632 771.512 89.08 773.048 84.664H787.16C785.048 92.248 780.824 98.44 774.488 103.24C768.152 107.944 760.28 110.296 750.872 110.296C743.384 110.296 736.664 108.616 730.712 105.256C724.856 101.896 720.248 97.144 716.888 91C713.528 84.76 711.848 77.56 711.848 69.4C711.848 61.24 713.48 54.088 716.744 47.944C720.008 41.8 724.568 37.096 730.424 33.832C736.376 30.472 743.192 28.792 750.872 28.792C758.36 28.792 764.984 30.424 770.744 33.688C776.504 36.952 780.92 41.464 783.992 47.224C787.16 52.888 788.744 59.32 788.744 66.52ZM775.208 63.784C775.208 58.792 774.104 54.52 771.896 50.968C769.688 47.32 766.664 44.584 762.824 42.76C759.08 40.84 754.904 39.88 750.296 39.88C743.672 39.88 738.008 41.992 733.304 46.216C728.696 50.44 726.056 56.296 725.384 63.784H775.208Z" stroke="white" stroke-width="3"/>
</svg>







      </div>

      <div className="footer-profile-main">
        <Wave
          className="wave"
          fill="#FA7268"
          paused={false}
          options={{
            height: 60,
            amplitatude: 40,
            speed: 0.2,
            points: 4,
          }}
        />

        <div className="wave-overlap">
          <Wave
            className="wave"
            fill="#e34c67"
            paused={false}
            options={{
              height: 90,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>

        <div className="wave-overlap">
          <Wave
            className="wave"
            fill="#C62368"
            paused={false}
            options={{
              height: 110,
              amplitatude: 40,
              speed: 0.1,
              points: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
