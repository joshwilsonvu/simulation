import {createGlobalStyle} from 'styled-components'
import theme from './theme';

// exports a stylesheet based on the theme
export default createGlobalStyle`

body {
  color: ${theme.textColor};
  font-size: ${theme.baseFontSize};
  font-family: ${theme.baseFontFamily};
  font-weight: ${theme.baseFontWeight};
  padding: 30px;
  line-height: 1.6;
}

a {
  color: ${theme.linkColor};
  text-decoration: none;

  &:visited {
    color: ${theme.linkVisitedColor};
  }

  &:hover,
  &:visited:hover {
    color: ${theme.linkHoverColor};
    text-decoration: underline;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: ${theme.headingFontFamily};
  font-weight: ${theme.headingFontWeight};
}
h1,
h2 {
  line-height: 1.1;
}
h3,
h4 {
  line-height: 1.3;
}
h1 {
  font-size: 400%;
  letter-spacing: -2px;
}
h2 {
  font-size: 250%;
  letter-spacing: -1px;
}
h3 {
  font-size: 200%;
}
h4 {
  font-size: 180%;
}
h5 {
  font-size: 130%;
}
h6 {
  font-size: 100%;
}

ul {
  list-style-type: disc;
}
ol {
  list-style: decimal;
}

h1, h2, h3, h4, h5, h6 {
  margin: 1em 0 0.5em;
}

p,
ul,
ol,
pre {
  margin: 1em 0;
}

pre,
code {
  font-family: ${theme.fixedFontFamily};
  font-size: ${theme.fixedFontSize};
  line-height: ${theme.fixedLineHeight};
}

.float-left {
  float: left;
  margin-right: 1em;
}
.float-right {
  float: right;
  margin-left: 1em;
}

.text-left {
  text-align: left !important;
}
.text-center {
  text-align: center !important;
}
.text-right {
  text-align: right !important;
}

.content {
  margin: 0 auto;
  width: 32em;
}

.header-block {
  font-size: 110%;

  &.typography h1 {
    font-size: 450%;
  }
}
`;