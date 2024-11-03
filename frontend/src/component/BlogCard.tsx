

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
    return (
        <div className="border-b border-slate-300 px-4 py-3 w-full min-w-96 max-w mx-auto md:max-w-full lg:w-2/3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
                <Avatar name={authorName} size="small" />
                <div className="font-semibold text-base text-gray-700">{authorName}</div>
                <Circle />
                <div className="text-sm text-slate-600">{publishedDate}</div>
            </div>
            <div className="mt-2">
                <h2 className="text-lg font-bold capitalize leading-6 tracking-tight text-gray-900">{title}</h2>
            </div>
            <p className="font-serif mt-2 text-base text-gray-800 line-clamp-3">{content.slice(0, 100) + "..."}</p>
            <div className="text-slate-400 text-sm mt-2">{`${Math.ceil(content.length / 100)} min read`}</div>
        </div>
    );
};

function Circle() {
    return <div className="w-1 h-1 rounded-full bg-slate-300 mx-2" />;
}

export function Avatar({ name, size = "small" }: { name: string; size: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? 'w-8 h-8' : 'w-12 h-12'}`}>
            <span className={`${size === "small" ? "text-sm" : "text-lg"} font-semibold text-gray-600 dark:text-gray-300`}>
                {name[0]}
            </span>
        </div>
    );
}
