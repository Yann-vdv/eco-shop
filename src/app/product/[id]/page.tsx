"use client";
import { getImage, getProductById } from "@/axios"
import { Iarticle } from "@/interface/Article";
import { useEffect, useState } from "react"

interface Props {
    params:{id: string}
}

export default function Product({ params }:Props) {

    const [product,setProduct] = useState<Iarticle|null>(null);

    useEffect(()=> {
        getProductById(params.id)
        .then((res)=>setProduct(res.data))
        .catch((err)=>console.error("getProductById Error :",err));
    },[])

    return (
        <div>
            <h1>{product?.name}</h1>
            <div>
                <h4>Description : </h4>
                <p>{product?.description}</p>
            </div>
            <div>
                <h4>Prix : </h4>
                <p>{product?.price}</p>
            </div>
            <div>
                <h4>stoque : </h4>
                <p>{product?.quantity}</p>
            </div>
            {product?.image &&<img src={`http://localhost:3001/image/${product.image}?width=100&height=100`} alt={product.image} />}
        </div>
    )
}