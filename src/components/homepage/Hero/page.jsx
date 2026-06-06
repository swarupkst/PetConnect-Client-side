"use client";

import Link from "next/link";
import Left from "./Left";
import Right from "./Right";

export default function Hero() {
    return (

        <div className="">
        <section className=" bg-gradient-to-r from-[#050816] via-[#35160e] to-[#050816] text-white">
            <div className="container mx-auto px-20 py-40 sm:pt-56 flex flex-col-reverse md:flex-row items-center gap-12">

                {/* LEFT CONTENT */}
                <div className="flex-1 text-center md:text-left">
                    <Left />
                </div>

                <div className="flex-1 flex justify-center">
                    <Right />
                </div>


              


            </div>
        </section>
        </div>
    );
}