import React from 'react'
import Image from 'next/image'
const FeedCard:React.FC=()=>{
    return <div className="border">
        <div className="grid grid-cols-12">
            <div className="col-span-1">
                <Image src="https://avatars.githubusercontent.com/u/76663093?v=4" height={50} width={50} alt={'imgnotefounadsc'}/>
            </div>
            <div className="col-span-11">
                <h5>Vishal Aitha</h5>
                <pre>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi vitae natus ducimus. Modi magni veritatis aut enim accusantium quaerat ducimus?
                    </p>
                </pre>
            </div>
        </div>
    </div>;
}
export default FeedCard