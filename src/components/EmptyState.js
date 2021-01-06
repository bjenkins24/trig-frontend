import React from 'react';
import PropTypes from 'prop-types';
import { Heading2, Body1, Button } from '@trig-app/core-components';

const EmptyStateImage = () => {
  return (
    <svg
      width="334"
      height="246"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <filter
          x="-5%"
          y="-23%"
          width="110%"
          height="150%"
          filterUnits="objectBoundingBox"
          id="FOTYzUbjgbwNAgmJ"
        >
          <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation="4"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <filter
          x="-5%"
          y="-23%"
          width="110%"
          height="150%"
          filterUnits="objectBoundingBox"
          id="oKZxrJ-euFMejqyx"
        >
          <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation="4"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <filter
          x="-5%"
          y="-23%"
          width="110%"
          height="150%"
          filterUnits="objectBoundingBox"
          id="KNfiaJLsYVPouyMD"
        >
          <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation="4"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <rect
          id="PwiyehelNAuBW_YD"
          x="0"
          y="0"
          width="250"
          height="50"
          rx="4"
        />
        <rect
          id="FigyBhzrtrImJqGH"
          x="0"
          y="0"
          width="250"
          height="50"
          rx="4"
        />
        <rect
          id="cdOAxS-cYqOhjLSe"
          x="0"
          y="0"
          width="250"
          height="50"
          rx="4"
        />
      </defs>
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="MqjQNVLmEMTB_ejF" transform="translate(-318 -697)">
          <g id="AtFx_gwXwJQjQNdO" transform="translate(326 697)">
            <rect
              id="KNfiaJLsYVPouyMD"
              fill="#E6E5E5"
              x="36"
              y="0"
              width="246"
              height="246"
              rx="20"
            />
            <g id="EgedsNcmGeccdvBk" transform="translate(0 32)">
              <g id="KNfiaJLsYVPouyMD">
                <use
                  fill="#000"
                  filter="url(#FOTYzUbjgbwNAgmJ)"
                  xlinkHref="#PwiyehelNAuBW_YD"
                />
                <use fill="#FAFAFA" xlinkHref="#PwiyehelNAuBW_YD" />
              </g>
              <circle
                id="kPyItLpAP-ORZbtx"
                fill="#B3E2DD"
                cx="28"
                cy="25"
                r="12"
              />
              <rect
                id="KNfiaJLsYVPouyMD"
                fill="#E6E5E5"
                x="56"
                y="22"
                width="178"
                height="6"
                rx="1"
              />
            </g>
            <g id="SKtvcKAukDLOXQsZ" transform="translate(68 98)">
              <g id="KNfiaJLsYVPouyMD">
                <use
                  fill="#000"
                  filter="url(#oKZxrJ-euFMejqyx)"
                  xlinkHref="#FigyBhzrtrImJqGH"
                />
                <use fill="#FAFAFA" xlinkHref="#FigyBhzrtrImJqGH" />
              </g>
              <circle
                id="kPyItLpAP-ORZbtx"
                fill="#B3E2DD"
                cx="28"
                cy="25"
                r="12"
              />
              <rect
                id="KNfiaJLsYVPouyMD"
                fill="#E6E5E5"
                x="56"
                y="22"
                width="178"
                height="6"
                rx="1"
              />
            </g>
            <g id="PGsgrmEEmIsZgKTz" transform="translate(0 164)">
              <g id="KNfiaJLsYVPouyMD">
                <use
                  fill="#000"
                  filter="url(#KNfiaJLsYVPouyMD)"
                  xlinkHref="#cdOAxS-cYqOhjLSe"
                />
                <use fill="#FAFAFA" xlinkHref="#cdOAxS-cYqOhjLSe" />
              </g>
              <circle
                id="kPyItLpAP-ORZbtx"
                fill="#B3E2DD"
                cx="28"
                cy="25"
                r="12"
              />
              <rect
                id="KNfiaJLsYVPouyMD"
                fill="#E6E5E5"
                x="56"
                y="22"
                width="178"
                height="6"
                rx="1"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const EmptyStateProps = {
  heading: PropTypes.string.isRequired,
  buttonProps: PropTypes.object,
  content: PropTypes.string.isRequired,
  hasImage: PropTypes.bool,
};

const defaultProps = {
  buttonProps: {},
  hasImage: true,
};

const EmptyState = ({
  heading,
  content,
  buttonProps,
  hasImage,
  ...restProps
}) => {
  return (
    <div
      css={`
        margin-top: ${({ theme }) => theme.space[6]}px;
        text-align: center;
      `}
      {...restProps}
    >
      <div
        css={`
          display: inline-block;
          max-width: 425px;
        `}
      >
        <div
          css={`
            margin-bottom: ${({ theme }) => theme.space[5]}px;
          `}
        >
          {hasImage && <EmptyStateImage />}
        </div>
        <Heading2>{heading}</Heading2>
        <Body1>{content}</Body1>
        {Object.keys(buttonProps).length !== 0 && (
          <Button
            css={`
              display: block;
              margin: ${({ theme }) => theme.space[4]}px auto 0;
            `}
            size="lg"
            {...buttonProps}
          />
        )}
      </div>
    </div>
  );
};

EmptyState.propTypes = EmptyStateProps;
EmptyState.defaultProps = defaultProps;

export default EmptyState;
