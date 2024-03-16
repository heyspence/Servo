import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const LogoSvg = (onClick) => {
    const location = useLocation();
    const history = useHistory();

    const handleLogoClick = () => {
        history.push('/')
    }

    const getPageClass = () => {
        switch(location.pathname.replace('/', '')){
            case('contact-us'):
                return 'blue'
            case('terms-of-service'):
                return 'blue'
            case('privacy-policy'):
                return 'blue'
            case('about-us'):
                return 'blue';
            case('vendor-onboarding'):
                return 'blue'
            default:
                return 'white'
        }
    }

    let pageClass = getPageClass();

    return(
        <svg
        version="1.1"
        id="svg2"
        width="120"
        height="70"
        viewBox="0 0 240 70"
        onClick={handleLogoClick}
        className="main-nav-logo"
      >
        <defs id="defs6">
          <clipPath
            clipPathUnits="userSpaceOnUse"
            id="clipPath16"
          >
            <path
              d="M 0,72 H 180 V 0 H 0 Z"
              id="path14" />
          </clipPath>
        </defs>
        <g
          id="g8"
          transform="matrix(1.3333333,0,0,-1.3333333,0,96)"
        >
          <g id="g10">
            <g
              id="g12"
              clipPath="url(#clipPath16)"
            >
              <g
                id="g66"
                transform="translate(14.8075,59.0536)"
              >
                <path
                  d="M 0,0 C 0,6.647 3.708,9.971 11.122,9.971 18.555,9.971 22.271,6.647 22.271,0 V -6.383 H 14.519 V 0 c 0,2.137 -1.123,3.205 -3.37,3.205 H 11.095 C 8.866,3.205 7.752,2.137 7.752,0 v -4.301 c 0,-2.119 2.42,-4.712 7.26,-7.78 4.84,-3.05 7.259,-6.711 7.259,-10.985 v -5.999 c 0,-6.666 -3.707,-9.999 -11.122,-9.999 C 3.716,-39.046 0,-35.713 0,-29.065 v 6.382 h 7.752 v -6.382 c 0,-2.137 1.133,-3.206 3.397,-3.206 2.247,0 3.37,1.069 3.37,3.206 v 5.424 c 0,2.301 -2.42,4.985 -7.259,8.054 C 2.42,-12.538 0,-8.831 0,-4.465 Z"
                  style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                  id="path68"
                  className={`logo-${pageClass}`}
                />
              </g>
              <g
                id="g70"
                transform="translate(46.2343,68.3671)"
              >
                <path
                  d="M 0,0 H 20.107 V -6.739 H 7.753 v -13.615 h 10.628 v -6.793 H 7.753 v -13.588 h 12.354 v -6.766 H 0 Z"
                  style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                  id="path72"
                  className={`logo-${pageClass}`}
                />
              </g>
              <g
                id="g74"
                transform="translate(82.4276,61.6284)"
              >
                <path
                  d="m 0,0 v -13.615 h 1.78 c 1.078,0 1.817,0.064 2.22,0.192 1.405,0.493 2.108,1.506 2.108,3.041 V -3.26 C 6.108,-1.087 4.985,0 2.739,0 Z M -7.753,6.739 H 3.534 c 6.884,0 10.327,-3.333 10.327,-9.999 v -7.122 c 0,-4.182 -2.036,-6.94 -6.109,-8.273 l 8.711,-22.107 H 7.971 L 0.986,-19.86 0,-19.998 v -20.764 h -7.753 z"
                  style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                  id="path76"
                  className={`logo-${pageClass}`}
                />
              </g>
              <g
                id="g78"
                transform="translate(121.579,20.8661)"
              >
                <path
                  d="m 0,0 h -10.629 l -5.478,30.708 -2.521,16.793 h 7.835 L -5.342,10.903 0.137,47.501 H 7.972 L 5.452,30.654 Z"
                  style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                  id="path80"
                  className={`logo-${pageClass}`}
                />
              </g>
              <g
                id="g82"
                transform="translate(150.7597,59.0536)"
              >
                <path
                  d="M 0,0 C 0,2.137 -1.123,3.205 -3.37,3.205 H -3.424 C -5.653,3.205 -6.767,2.137 -6.767,0 v -29.065 c 0,-2.137 1.124,-3.206 3.37,-3.206 2.264,0 3.397,1.069 3.397,3.206 z m 7.752,-29.065 c 0,-6.648 -3.716,-9.981 -11.149,-9.999 -7.415,0 -11.122,3.333 -11.122,9.999 V 0 c 0,6.647 3.707,9.971 11.122,9.971 C 4.036,9.971 7.752,6.647 7.752,0 Z"
                  style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                  id="path84"
                  className={`logo-${pageClass}`}
                />
              </g>
              <g
                id="g86"
                transform="translate(147.5854,29.5014)"
                >
                <path
                    d="m 0,0 -9.115,10.824 3.824,3.22 4.994,-5.93 20.005,27.623 4.05,-2.933 z"
                    style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                    id="path88"
                    className={`logo-accent-${pageClass}`}
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
}

export default LogoSvg;