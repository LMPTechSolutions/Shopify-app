import React from "react";

const SVG = ({
  style = {},
  fill = "#000",
  width = "773px",
  height = "49px",
  className = "",
  viewBox="0 0 773 49"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
                   <g id="Admin-Panel-Prototype" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
        <g id="onboarding:-step-4-[desktop]" transform="translate(-390.000000, -248.000000)">
            <g id="admin-panel/desktop/progress-bar-4" transform="translate(392.000000, 250.000000)">
                <g id="progress-bar-4">
                    <circle id="Oval" stroke="#00848E" strokeWidth="3" fill="#00848E" cx="203.5" cy="22.5" r="22.5"></circle>
                    <circle id="Oval" stroke="#00848E" strokeWidth="3" fill="#00848E" cx="22.5" cy="22.5" r="22.5"></circle>
                    <path d="M226,23.1394043 L362,23.1394043" id="Line-2" stroke="#00848E" strokeWidth="5" strokeLinecap="square"></path>
                    <path d="M45,23.1394043 L181,22.5" id="Line-2" stroke="#00848E" strokeWidth="5" strokeLinecap="square"></path>
                    <circle id="Oval" stroke="#00848E" strokeWidth="3" cx="565.5" cy="22.5" r="21"></circle>
                    <circle id="Oval" stroke="#00848E" strokeWidth="3" cx="384.5" cy="22.5" r="22.5"></circle>
                    <path d="M405,23.1394043 L543,23.1394043" id="Line-2" stroke="#00848E" strokeWidth="5" strokeLinecap="square"></path>
                    <circle id="Oval" stroke="#00848E" strokeWidth="3" fill="#00848E" cx="384.5" cy="22.5" r="21"></circle>
                    <path d="M407,23.1394043 L543,22.5" id="Line-2" stroke="#00848E" strokeWidth="5" strokeLinecap="square"></path>
                    <circle id="Oval" stroke="#00848E" strokeWidth="3" fill="#00848E" cx="748.5" cy="22.5" r="22.5"></circle>
                    <path d="M588,23.1394043 L726,23.1394043" id="Line-2" stroke="#00848E" strokeWidth="5" strokeLinecap="square"></path>
                    <text id="5" fontFamily="Roboto-Bold, Roboto" fontSize="20" fontWeight="bold" fill="#FFFFFF">
                        <tspan x="742" y="30">5</tspan>
                    </text>
                    <text id="4" fontFamily="Roboto-Bold, Roboto" fontSize="20" fontWeight="bold" fill="#00848E">
                        <tspan x="559" y="30">4</tspan>
                    </text>
                    <text id="3" fontFamily="Roboto-Bold, Roboto" fontSize="20" fontWeight="bold" fill="#FFFFFF">
                        <tspan x="379" y="30">3</tspan>
                    </text>
                    <text id="2" fontFamily="Roboto-Bold, Roboto" fontSize="20" fontWeight="bold" fill="#FFFFFF">
                        <tspan x="198" y="30">2</tspan>
                    </text>
                    <text id="1" fontFamily="Roboto-Bold, Roboto" fontSize="20" fontWeight="bold" fill="#FFFFFF">
                        <tspan x="18" y="30">1</tspan>
                    </text>
                </g>
            </g>
        </g>
    </g>
  </svg>
);

export default SVG;