import { useEffect, useState } from "react"
import Login from "./Login"

function Product() {
    // const [pic, setpic] = useState([])
    // const [preview, setPreview] = useState([])

    // const handleInput = (e) => {
    //     console.log(pic);
    //     const convert = Array.from(e.target.files)
    //     setpic((prev) => [...prev, ...convert])
    //     console.log(pic);
    //     const previewUrl = convert.map(file => URL.createObjectURL(file))
    //     setPreview(previewUrl)

    // }

    // const post = (e) => {
    //     if (post.length == 0) {
    //         alert("add input")
    //         return
    //     }
    //     console.log(pic);
    //     console.log(pic.length);

    // }
    async function fetchApi() {
        const response = await fetch('https://fakestoreapi.com/products/')
        console.log(response);
        const products = await response.json()
        console.log(products);
    }
    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <>
            {/* <div><h1 className="text-blue-800">This is Product page</h1></div>
            <form action="" onSubmit={post}>
                <input type="file" multiple onChange={handleInput} />
                <button>post</button>
            </form>
            {
                preview.map((prew, index) => (
                    <img key={index} src={prew} />
                ))
            } */}
        </>
    )
}
export default Product