import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const BookCard = ({ book }) => {
    const dispatch = useDispatch();

    const handleAddtoCart = (product) => {
        dispatch(addToCart(product))
    }
    return (
        <div className=" rounded-lg transition-shadow duration-300">
            <div
                className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4"
            >
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                    <Link to={`/books/${book._id}`}>
                        <img
                            src={`${getImgUrl(book?.coverImage)}`}
                            alt=""
                            className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </Link>
                </div>

                <div>
                    <Link to={`/books/${book._id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                            {book?.title.length > 20 ? `${book.title.slice(0, 20)}...` : book?.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 mb-5">{book?.description.length > 55 ? `${book.description.slice(0, 55)}...` : book?.description}</p>
                    <p className="font-medium mb-5">
                        ${book?.newPrice} <span className="line-through font-normal ml-2">$ {book?.oldPrice}</span>
                    </p>
                    <button
                        onClick={() => handleAddtoCart(book)}
                        className="btn-primary flex items-center gap-5">
                        <FiShoppingCart className=" size-5 btn-cart" />
                        <p className="">Add to Cart</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookCard