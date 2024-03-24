
interface BlogCardProps{
    authorName:string;
    title: string, 
    content:string,
    publishedDate:string
    id:number
}



export const BlogCard =({
    id,
    authorName,
    title, 
    content,
    publishedDate
}:BlogCardProps)=>{
    return(
        <div  className="border-b border-slate-300 px-4 py-2 w-full min-w-96">
            <div className=" flex  flex-row justify-start">
                <>
               <Avatar name={authorName} size="small"/>
               </>
               <div className="font-semibold text-base px-2  "> {authorName}</div>
               <div className="flex justify-center flex-col pl-2 ">
               <Circle/>
               </div>
              
               <div className=" text-sm text-center flex flex-col justify-center px-2 text-slate-600 ">{publishedDate}</div>
            </div>
            <div className="text-lg font-bold capitalize break-words pt-2 leading-6 tracking-tight">
                {title}
            </div>
            <div className="font-serif mt-2 text-base ">
                {content.slice(0,100)+"..."}
            </div>
            <div className=" text-slate-400 text-sm mt-2 ">
                {`${Math.ceil(content.length/100)} min read`}
            </div>
            {/* <div className="bg-slate-200  h-1 w-full"></div> */}
        </div>
    )
}

function Circle(){
    return <>

    <div className="w-1 h-1 rounded-full bg-slate-300 "></div>
    
    </>
}

export function Avatar ({name ,size="small"}:{name:string,size:"small"|"big"}){
    return <div>
    <div className={`relative  p-2 inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size=="small"?'w-6 h-6':'w-10 h-10'}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-semibold  text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>
</div>
}