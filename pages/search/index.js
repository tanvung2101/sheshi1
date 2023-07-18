import productsApis from "@/apis/productApis";
import dynamic from 'next/dynamic'
const ItemSlide = dynamic(() => import('../../components/ItemSlide'), { ssr: false })
const SEO = dynamic(() => import('../../components/SEO/index'), { ssr: false })
// import { ItemSlide, SEO } from "@/components";
import { GLOBAL_STATUS } from "@/constants";
import { useRouter } from "next/router";
import React from "react";

const Search = ({ product }) => {
  const { router } = useRouter();
  console.log(router)
  const { data } = product;
  const { params } = product;
  if (params === undefined) return params === ''

  console.log(router);
  return (
    <>
      <SEO title="tìm kiếm"></SEO>
      <h1 className="mt-20 mb-8 text-center text-4xl text-black">Tìm kiếm</h1>
      <p className="mt-4 text-center text-lg ">{`Kết quả tìm kiếm cho "${params}"`}</p>
      <div className="px-8 grid grid-cols-4 my-8 max-md:grid-cols-2 max-[576]:grid-cols-1 max-[576]:px-2">
        {data.rows.length > 0 &&
          data.rows.map((item) => {
            console.log('ítemmm', item)
            return (
              <ItemSlide
                key={item.id}
                propProduct={item}
              />
            );
          })}
      </div>
    </>
  );
};

export async function getServerSideProps(content) {
  const params = {
    name: content.query.keyword,
    getMainImage: true,
    status: GLOBAL_STATUS.ACTIVE,
  };
  const data = await productsApis.getAllProducts(params);

  return {
    props: {
      product: { data: data.data, params: content.query.keyword },
    },
  };
}

export default Search;
