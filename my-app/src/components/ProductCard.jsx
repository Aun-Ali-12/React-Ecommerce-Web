//Handles Card UI structure
const ProductCard = ({ product }) => {
    const { title, image, description, price } = product;
    
    return (
        <>
            <div className="card">
                <img src={image[0]} alt={description} width="200px" height="200px" />
                <h1>Name:{title}</h1>
                <p>Price:{price}</p>
            </div>
        </>
    )
}
export default ProductCard