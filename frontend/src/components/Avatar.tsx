interface AuthorProp {
    author: string;
}

const Avatar = ({author}: AuthorProp) => {

    const segName = author.split(" ");
    let displayName = segName.map((x) => x.slice(0,1).toUpperCase());
    if(displayName.length > 2) displayName = displayName.slice(0,2);
    return(
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{displayName}</span>
        </div>
    )
}

export default Avatar