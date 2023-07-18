import { ItemSlide, SEO, Title } from "@/components";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import categoryApis from "./../../apis/categoryApí";
import axios from "axios";
import productsApis from "@/apis/productApis";
import { GLOBAL_STATUS } from "@/constants";
import CheckBox from "@/components/checkbox";
import { AiOutlineClose } from "react-icons/ai";
import { BsFunnel } from "react-icons/bs";

const initFilter = {
  category: [],
  capacity: [],
};

const PageProduct = ({ data }) => {
  const { product } = data;

  const [show, setShow] = useState(false)

  const [filter, setFilter] = useState(initFilter);
  const [category, setCategory] = useState();
  const [productCategory, setProductCategory] = useState(product.rows);
  const [productsOptions, setProductsOptions] = useState(product.rows);
  const router = useRouter();
  const updateProducts = useCallback(() => {
    let temp = productsOptions;
    if (filter.category.length > 0) {
      temp = temp?.filter((e) =>
        filter.category.includes(e.productCategory.categorySlug)
      );
    }
    setProductCategory(temp);
  }, [filter, productsOptions]);

  async function allCategory() {
    const category = await categoryApis.getAllCategory()
    setCategory(category)
  }
  useEffect(() => {
    updateProducts();
    allCategory()
  }, [updateProducts]);
  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.categorySlug],
          });
          break;
        case "CAPACITY":
          setFilter({
            ...filter,
            capacity: [...filter.capacity, item.capacity],
          });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(
            (e) => e !== item.categorySlug
          );
          setFilter({ ...filter, category: newCategory });
          break;
        case "CAPACITY":
          const newCapacity = filter.capacity.filter(
            (e) => e !== item.capacity
          );
          setFilter({ ...filter, capacity: newCapacity });
          break;
        default:
      }
    }
  };
  const clearFilter = () => setFilter(initFilter);
  return (
    <>
      <SEO title="SẢN PHẨM SHESHI" href="/logosheshe.png"></SEO>
      <div className="bg-light-pink py-5">
        <Title className="text-3xl font-bold">sản phẩm</Title>
      </div>
      <div className="py-8 px-24 flex max-lg:px-5 max-lg:flex-col max-lg:relative max-sm:px-0">
        <div className="hidden max-lg:inline-block max-lg:ml-8">
          <button
            onClick={() => setShow(true)}
            type="button"
            className="mt-6 flex items-center gap-1 p-2 text-sm rounded-md active:border active:border-slate-600"
          >
            <BsFunnel className="text-lg"></BsFunnel>
            Bộ lọc
          </button>
        </div>
        <div className={`transition-all duration-500 ease-in-out ${show ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'} flex-col w-[20%] max-lg:px-4 max-lg:fixed max-lg:top-[5%] max-lg:left-0 max-lg:h-full max-lg:pt-6 max-lg:!z-[80] max-lg:bg-white max-lg:w-[25%] max-md:w-[30%] max-sm:w-[80%] max-sm:top-[10%]`}>
          <div onClick={() => setShow(false)} className="hidden max-lg:block max-lg:mb-8 max-lg:cursor-pointer">
            <AiOutlineClose className="text-2xl"></AiOutlineClose>
          </div>
          <h4 className="text-xl text-black font-sans font-bold mb-4 max-lg:text-center max-md:text-lg max-md:pb-2">
            Danh Mục Sản Phẩm
          </h4>
          <div className="">
            {category?.length > 0 &&
              category?.map((item) => {
                return (
                  <div
                    // onClick={() => showHideFilter()}
                    key={item.id}
                    className="relative mb-4 group"
                  >
                    <CheckBox
                      label={item.name}
                      onChange={(input) =>
                        filterSelect("CATEGORY", input.checked, item)
                      }
                      checked={filter.category.includes(item.categorySlug)}
                    ></CheckBox>
                  </div>
                );
              })}
          </div>
          <div className="overflow-hidden">
            <button
              type="button"
              className="mt-6 flex items-center gap-1 p-2 text-sm rounded-md active:border active:border-slate-600"
              onClick={() => clearFilter()}
            >
              <AiOutlineClose className="text-xs"></AiOutlineClose>
              Xóa bộ lọc
            </button>
          </div>
        </div>
        <div className="w-[80%] max-lg:w-full">
          <div className="grid grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {productCategory.length > 0 &&
              productCategory.map((item) => {
                return (
                  <div key={item.id}>
                    <ItemSlide
                      propProduct={item}
                    ></ItemSlide>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  // const category = await categoryApis.getAllCategory();
  const params = {
    size: 14,
    getMainImage: true,
    status: GLOBAL_STATUS.ACTIVE,
  };
  const product = await productsApis.getAllProducts(params);
  const data = {
    // category: category.data,
    product: product.data
  };
  return {
    props: { data },
    revalidate: 300,
  };
}

export default PageProduct;
