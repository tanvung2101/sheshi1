import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import sheshicosmetic from '../../public/sheshicosmetic.jpg'

const SEO = (props) => {
  const { title = 'CÔNG TY CỔ PHẦN TẬP ĐOÀN SHESHI',
    description = "SHESHI là thương hiệu mỹ phẩm cao cấp được xây dựng từ tâm huyết của những con người có kinh nghiệm lâu năm trong lĩnh vực làm đẹp và mỹ phẩm. Những sản phẩm tại SHESHI đều đã được trải qua nhiều công đoạn dày công nghiên cứu và phát triển để đem đến cho khách hàng những sản phẩm chất lượng tốt nhất.",
    image = window.location.origin + sheshicosmetic.src,
    href = '/logosheshe.png',
    children
  } = props;
  return (
    <Head>
      <link rel="icon" href={href} />
      <link rel="canonical" href={window.location.href} />
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta property="og:title" content={title} />
      <meta name="description" content={description} key="desc" />
      <meta property="og:url" content={window.location.href} />
      <meta
        property="og:image"
        content={image}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      {children}
    </Head>
  );
};

// SEO.defaultProps = {
//   title: settings && settings.meta && settings.meta.title,
//   description: settings && settings.meta && settings.meta.description,
//   image:
//     settings &&
//     settings.meta &&
//     settings.meta.social.graphic,
// };

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default SEO;
