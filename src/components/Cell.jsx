function Cell(props) {
    return (
        <>
            <div onClick={props.onClick} className="w-[7.5vw] h-[7.5vw] bg-green-100 hover:bg-green-300 border-2 border-blue-500 hover:border-gray-100 rounded-lg hover:text-gray-100 flex justify-center items-center cursor-pointer">
                <span className="text-4xl" >{props.mark}</span>
            </div>
        </>
    )
}

export default Cell