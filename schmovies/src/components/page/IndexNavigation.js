export default function IndexNavigation({props}) {
    const {page, maxPage, movePage, setPage} = props
    return (
        <div className="float-right p-4 flex gap-2 items-center text-blue-800 text-lg">
            <form className="border-2 border-gray-300">
                <input type="number" defaultValue={page} min={1} max={maxPage} 
                className="size-[40px] text-center" onChange={movePage}/>
            </form>
            <p>/{maxPage}</p>
        </div>
    )
}