import dynamic from 'next/dynamic'
const Title = dynamic(() => import('../../components/Title'),)
import axios from 'axios';
import React, { useState } from 'react'
import { SEO } from '@/components';

const PageSlugNews = ({ data }) => {
    const [detailNews, setDetailNews] = useState(data)
    return (
        <>
            <SEO title={detailNews.title}></SEO>
            <div className="bg-light-pink py-5 mb-4">
                <Title className="text-3xl font-bold">tin tức</Title>
            </div>
            <div className='py-16 px-28'>
                <h4 className='text-2xl'>{detailNews.title}</h4>
                <div className='text-base'>{detailNews.slug}</div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const getNewsSlug = await axios.get('http://0.0.0.0:3001/api/news')
    const paths = getNewsSlug.data.rows.map((slug) => {
        return {
            params: {
                "slug-news": slug.slug,
            },
        };
    });
    return {
        paths: paths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const slug = context.params['slug-news'];
    const getDetailNews = await axios.get(`http://0.0.0.0:3001/api/news/getNewsBySlug/${slug}`);
    return {
        props: { data: getDetailNews.data },
    };
}

export default PageSlugNews