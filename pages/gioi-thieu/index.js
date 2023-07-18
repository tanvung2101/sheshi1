import { SEO, Title } from "@/components";
import { CONTENT_PAGE } from "@/constants";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const GioiThieu = ({ product }) => {
  const [content, setContent] = useState();
  // console.log("content", content);
  useEffect(() => {
    setContent(product);
  }, [product]);
  // console.log(content)
  function addProductJsonLd() {
    return {
      __html: `{
      "@context": "http://localhost:3000",
      "@type": "giới thiệu về sheshi",
      "name": "Executive Anvil",
      "image": [
        ${content?.find(
        (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
      ).image}
        ${content?.find(
        (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
      ).image},
        ${content?.find(
        (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
      ).image}
       ],
      "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
      "sku": "0446310786",
      "mpn": "925872",
      "brand": {
        "@type": "Brand",
        "name": "ACME"
      },
  `,
    };
  }
  return (
    <>
      <SEO title="GIỚI THIỆU SHESHI"></SEO>
      <div className="bg-light-pink py-5 ">
        <Title className="text-3xl font-bold">giới thiệu</Title>
      </div>
      <div className="px-40 mt-10 max-md:px-16 max-lg:px-20 max-sm:px-4 max-sm:mt-0">
        <div className="flex justify-center gap-32 max-md:flex-col max-md:gap-8">
          <div className="mt-8">
            <h2 className="uppercase text-3xl font-bold max-md:mb-2 max-sm:text-2xl">
              giới thiệu về <span className="text-regal-red">sheshi</span>
            </h2>
            <span
              className="text-lg"
              dangerouslySetInnerHTML={{
                __html: content?.find(
                  (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                ).content,
              }}
            ></span>
          </div>
          <div className="pt-16 max-md:pt-2 max-lg:pt-16">
            {content && (
              <Image
                src={
                  content?.find(
                    (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                  ).image
                }
                alt=""
                width={2500}
                height={400}
              ></Image>
            )}
          </div>
        </div>
        <div className="flex flex-row-reverse justify-center gap-32 max-md:flex-col max-md:gap-8">
          <div className="mt-8">
            <h2 className="uppercase text-3xl font-bold max-md:mb-2 max-sm:text-2xl">
              giới thiệu về <span className="text-regal-red">sheshi</span>
            </h2>
            <span
              className="text-lg"
              dangerouslySetInnerHTML={{
                __html: content?.find(
                  (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                ).content,
              }}
            ></span>
          </div>
          <div className="pt-16 max-md:pt-2 max-lg:pt-16">
            {content && (
              <Image
                src={
                  content?.find(
                    (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                  ).image
                }
                alt=""
                width={2500}
                height={400}
              ></Image>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-32 mt-10 mb-16 max-md:flex-col max-md:gap-8">
          <div className="mt-8">
            <h2 className="uppercase text-3xl font-bold">
              giới thiệu về <span className="text-regal-red">sheshi</span>
            </h2>
            <span
              className="text-lg"
              dangerouslySetInnerHTML={{
                __html: content?.find(
                  (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                ).content,
              }}
            ></span>
          </div>
          <div className="pt-16 max-md:pt-2 max-lg:pt-16">
            {content && (
              <Image
                src={
                  content?.find(
                    (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                  ).image
                }
                alt=""
                width={2500}
                height={400}
              ></Image>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const params = {
    pageCode: [
      CONTENT_PAGE.INTRODUCE_PAGE,
      CONTENT_PAGE.INTRODUCE_PAGE_CUSTOMER,
      CONTENT_PAGE.INTRODUCE_PAGE_STORY,
    ],
  };

  const data = await axios.get(
    "http://0.0.0.0:3001/api/config-page/content-page",
    { params }
  );
  const product = data.data;
  return {
    props: { product },
  };
}

export default GioiThieu;
