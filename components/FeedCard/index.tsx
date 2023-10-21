import React from 'react'
import Image from 'next/image'
import { BiMessageRounded } from 'react-icons/bi';
import {AiOutlineHeart, AiOutlineRetweet} from 'react-icons/ai'
import { FiUpload } from 'react-icons/fi';
const FeedCard:React.FC=()=>{
    return <div className="border border-gray-600 border-l-0 border-r-0 border-b-0 p-5 hover:bg-slate-900 transition-all  cursor-pointer">
        <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1">
                <Image src="https://avatars.githubusercontent.com/u/76663093?v=4" height={50} width={50} alt={'imgnotefounadsc'}/>
            </div>
            <div className="col-span-11 pl-2">
                <h5>Vishal Aitha</h5>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi vitae natus ducimus. Modi magni veritatis aut enim accusantium quaerat ducimus?
                    </p>
                    <div className='flex justify-between mt-5  text-xl items-center p-2 w-[90%]'>
                        <div className="">
                            <BiMessageRounded/>
                        </div>
                        <div className="">
                            <AiOutlineRetweet/>
                        </div>
                        <div className="">
                            <AiOutlineHeart/>
                        </div>
                        <div className="">
                            <FiUpload/>
                        </div>

                    </div>
            </div>
        </div>
    </div>;
}
export default FeedCard