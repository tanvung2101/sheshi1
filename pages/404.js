import dynamic from 'next/dynamic'
const Button = dynamic(() => import('../components/Button'), {
    ssr: false,
})
import Link from "next/link";

export default function Custom404() {
    return (
        <div className="w-full h-full bg-orange-50 flex flex-col items-center py-36">
            <div className="uppercase text-8xl font-semibold text-center mb-8 max-md:text-6xl">comming soon</div>
            <p className="text-base font-normal mb-5">Vui lòng liên hệ admin để được support</p>
            <div>
                <Button><Link href='/'>Về trang chủ</Link></Button>
            </div>
        </div>
    )
}