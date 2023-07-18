import React, { forwardRef } from 'react'
import Button from './Button'
import { formatNumber } from '@/utils/funcs';
import Input from './Input';

const InputOtp = ({ errors, disabledSend = false, loading = false, onSendOTP, countdown = 0, className = '', ...props }, ref) => {
    return (
        <div className='flex flex-col items-start justify-center gap-2 w-full mb-4'>
            <label>Email OTP</label>
            <div className='w-full relative'>
                <Input
                    {...props}
                    value={props.value}
                    onChange={(e) => props.onChange(formatNumber(e.target.value))}
                    ref={ref}
                    placeholder='Email OTP'
                    // className={`w-full px-4 py-2 rounded-md outline-none text-sm h-[45px] ${className} ${errors
                    //     ? "focus:ring-[4px] focus:ring-red-300 border-[1px] focus:border-red-500 border-red-500"
                    //     : "border border-slate-400 focus:border-slate-600"
                    //     }`} 
                    className='h-[45px]'
                    errors={errors}
                />
                <Button
                    loading={loading}
                    disabled={disabledSend || countdown < 60}
                    onClick={onSendOTP}
                    className='!w-[80px] h-[43px] absolute top-[1px] right-0'
                >{(countdown !== 60 && countdown !== 0) ? countdown : 'Gửi'}
                </Button>
            </div>
            <div className='mt-1 text-sm text-red-500'>{errors}</div>
        </div>
    )
}

export default forwardRef(InputOtp)