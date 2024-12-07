"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus, FaRupeeSign, FaMinus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "../context/CartContext";
import Select from "./Select";

const truncateText = (text, length) =>
    text.length > length ? `${text.substring(0, length)}...` : text;

const Card = ({ item }) => {
    const { addToCart, decreaseQty, getCartItemQty } = useContext(CartContext);
    const [selectedVariant, setSelectedVariant] = useState(item?.variants?.[0]);

    const id = selectedVariant?.id || "";
    const company_name = item?.brand?.name || "";
    const slug = item?.slug || "";
    const item_name = selectedVariant?.fullName || "No Name Available";
    const url = selectedVariant?.images?.[0] || "/placeholder.png";
    const qty = selectedVariant?.name || "N/A";
    const mrp = parseInt(selectedVariant?.storeSpecificData?.[0]?.mrp || "0", 10);
    const discount = parseInt(selectedVariant?.storeSpecificData?.[0]?.discount || "0", 10);
    const discount_price = mrp - discount;

    return (
        <>
            <div className="flex flex-col h-[250px] md:h-[300px] w-[200px] box-border mt-5">
                {/* Image Container */}
                <div className="h-[180px] w-[90%] border border-gray-400 rounded-lg relative flex justify-center mx-auto">
                    <Link href={`/products/${slug}`}>
                        <Image
                            className="object-cover w-[130px] h-full p-2 "
                            src={url}
                            alt={item_name}
                            width="0"
                            height="0"
                            sizes="100vw"
                        />
                    </Link>
                    {getCartItemQty(id) ? (
                        <div className="absolute bottom-[0.75rem] right-[1rem] flex items-center gap-2 bg-red-500 text-white p-2 rounded-md text-lg">
                            <button onClick={() => {
                                decreaseQty(id)
                            }}>
                                <FaMinus />
                            </button>
                            <span>{getCartItemQty(id)}</span>
                            <button onClick={() => addToCart(id)}>
                                <FaPlus />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="absolute bottom-[0.75rem] right-[1rem] bg-red-500 text-white p-2 rounded-md text-lg"
                            onClick={() => addToCart(id)}
                        >
                            <FaPlus />
                        </button>
                    )}
                </div>

                {/* List of Details */}
                <ul className="mt-2 font-bold tracking-wide list-none px-0">
                    <li className="pb-1">{company_name}</li>
                    <li className="pb-1">{truncateText(item_name, 30)}</li>
                </ul>
                {
                    item.variants.length > 1 ? <Select variants={item.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} /> : <div className="text-md font-base my-1">{qty}</div>
                }
                {/* Price Container */}
                <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center font-bold text-lg text-black">
                        <FaRupeeSign /> {discount_price.toFixed(2)}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm line-through">
                        (<FaRupeeSign /> {mrp})
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
