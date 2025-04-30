import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItem) || []; 
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice || 0), 0).toFixed(2);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const [createOrder, { isLoading }] = useCreateOrderMutation();

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        };
        
        try {
            const response = await createOrder(newOrder).unwrap();
            console.log('Order Creation Response:', response);
            
            Swal.fire({
                title: "Confirmed Order",
                text: "Your order placed successfully!",
                icon: "success",
                confirmButtonText: "OK"
            });
            navigate("/order");
        } catch (error) {
            console.error("Error placing an order", error);
            Swal.fire({
                title: "Error",
                text: error?.data?.message || "Failed to place an order",
                icon: "error"
            });
        }
    };

    if (isLoading) return <div>Loading....</div>;

    return (
        <section className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
                    <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
                    <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-600">
                            <p className="font-medium text-lg">Personal Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-5">
                                {/* Full Name */}
                                <div className="md:col-span-5">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        {...register("name", { required: "Full name is required" })}
                                        type="text"
                                        id="name"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="md:col-span-5">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="text"
                                        id="email"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        defaultValue={currentUser?.email}
                                        disabled
                                    />
                                </div>

                                {/* Phone */}
                                <div className="md:col-span-5">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        {...register("phone", { 
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Phone number must be 10 digits"
                                            }
                                        })}
                                        type="tel"
                                        id="phone"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        placeholder="1234567890"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                                </div>

                                {/* Address */}
                                <div className="md:col-span-3">
                                    <label htmlFor="address">Address / Street</label>
                                    <input
                                        {...register("address", { required: "Address is required" })}
                                        type="text"
                                        id="address"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                                </div>

                                {/* City */}
                                <div className="md:col-span-2">
                                    <label htmlFor="city">City</label>
                                    <input
                                        {...register("city", { required: "City is required" })}
                                        type="text"
                                        id="city"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                                </div>

                                {/* Country */}
                                <div className="md:col-span-2">
                                    <label htmlFor="country">Country</label>
                                    <input
                                        {...register("country", { required: "Country is required" })}
                                        type="text"
                                        id="country"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.country && <p className="text-red-500 text-xs">{errors.country.message}</p>}
                                </div>

                                {/* State */}
                                <div className="md:col-span-2">
                                    <label htmlFor="state">State</label>
                                    <input
                                        {...register("state", { required: "State is required" })}
                                        type="text"
                                        id="state"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
                                </div>

                                {/* Zipcode */}
                                <div className="md:col-span-1">
                                    <label htmlFor="zipcode">Zipcode</label>
                                    <input
                                        {...register("zipcode", { 
                                            required: "Zipcode is required",
                                            pattern: {
                                                value: /^[0-9]{5,6}$/,
                                                message: "Invalid zipcode"
                                            }
                                        })}
                                        type="text"
                                        id="zipcode"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                    {errors.zipcode && <p className="text-red-500 text-xs">{errors.zipcode.message}</p>}
                                </div>

                                {/* Checkbox */}
                                <div className="md:col-span-5 mt-3">
                                    <div className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            id="billing_same"
                                            className="form-checkbox"
                                            checked={isChecked}
                                            onChange={() => setIsChecked(!isChecked)}
                                        />
                                        <label htmlFor="billing_same" className="ml-2">
                                            I agree to the <Link to="/terms" className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link to="/shipping-policy" className='underline underline-offset-2 text-blue-600'>Shopping Policy</Link>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="md:col-span-5 text-right">
                                    <button
                                        type="submit"
                                        disabled={!isChecked}
                                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        Place an Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>     
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;