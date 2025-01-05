import Avatar from "./Avatar";

interface BlogCardProps {
    author: string;
    title: string;
    content: string;
    publishDate: string;
}

const BlogCard = ({ author, title, content, publishDate } : BlogCardProps) => {

    return (
        <div>
            <div>
                <Avatar author={author} />{author} . {publishDate}
            </div>
            <div>
                {title}
            </div>
            <div>
                {`${content.slice(0,100)}...`}
            </div>
            <div>
                {`${Math.ceil(content.length/100)} minutes`}
            </div>
        </div>
    )

}

export default BlogCard