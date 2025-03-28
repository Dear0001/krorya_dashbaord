"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FoodRecipe } from "@/lib/definition";
import { convertRomanToKhmer, getImageUrl, levelBgColors } from "@/lib/constants";
import {useAddFavoriteMutation, useRemoveFavoriteMutation} from "@/redux/services/favorite";

type CardRecipePopularProps = {
    recipe: FoodRecipe;
};

export default function CardRecipePopular({ recipe }: CardRecipePopularProps) {
    const [favorite, setFavorite] = useState(recipe?.isFavorite || false);
    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useRemoveFavoriteMutation();
    const [minus, setMinus] = useState(false);

    const handleFavorite = async () => {
        try {
            if (favorite) {
                await removeFavorite({ id: recipe.id }).unwrap();
                setFavorite(false);
            } else {
                await addFavorite({ id: recipe.id }).unwrap();
                setFavorite(true);
            }
        } catch (error) {
            console.error("Error updating favorite:", error);
        }
    };

    const photoFileName = recipe?.photo?.length > 0 ? recipe.photo[0].photo : "/assets/default-food.jpg";
    const imageUrl = getImageUrl(photoFileName) || "/assets/default-food.jpg";
    const bgColor = levelBgColors;
    const levelClass = bgColor[recipe?.level] || "bg-gray-100 text-gray-800";
    const averageRating = recipe.averageRating || 0;

    return (
        <div className="card shadow-card p-2 rounded-[20px] overflow-hidden w-full hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="w-full h-32 sm:h-40 relative">
                <Link href={`/recipe/${recipe.id}`}>
                    <div
                        className="w-full h-full bg-cover bg-center rounded-[17px]"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    >
                    </div>
                </Link>

                {/* Always show favorite button if isFavorite is true */}
                {favorite && (
                    <div className="absolute top-2 right-2">
                        <button
                            onClick={handleFavorite}
                            className="bg-white p-1 rounded-full shadow-md"
                        >
                            <svg width="16" height="16" viewBox="0 0 18 16" fill="#D7AD45" stroke="#D7AD45" strokeWidth="1.5">
                                <path d="M8.45135 2.57069L9 3.15934L9.54865 2.57068C11.3843 0.601168 13.2916 0.439002 14.6985 1.10313C16.1598 1.79292 17.25 3.44662 17.25 5.43913C17.25 7.47271 16.4446 9.03777 15.2916 10.3785C14.3397 11.4854 13.1884 12.4021 12.06 13.3006C11.7913 13.5145 11.524 13.7273 11.261 13.9414C10.7867 14.3275 10.3684 14.6623 9.96682 14.9047C9.56435 15.1475 9.25342 15.25 9 15.25C8.74657 15.25 8.43565 15.1475 8.03319 14.9047C7.63158 14.6623 7.21329 14.3275 6.73906 13.9414C6.47602 13.7273 6.20868 13.5144 5.94004 13.3006C4.81163 12.4021 3.66029 11.4854 2.7084 10.3785C1.5554 9.03777 0.75 7.47271 0.75 5.43913C0.75 3.44662 1.84018 1.79292 3.30146 1.10313C4.70838 0.439003 6.61569 0.601167 8.45135 2.57069Z" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <div className="card-body p-2 bg-white">
                <div className="card-title text-slate-700 text-[14px] sm:text-[16px] py-1 truncate">
                    {recipe?.name || "មិនមានទេ"}
                </div>

                <div className="flex items-center gap-1 mt-1">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFD233"
                        strokeWidth="1.5"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        <defs>
                            <linearGradient id="grad">
                                <stop offset={`${(averageRating / 5) * 100}%`} stopColor="#FFD233" />
                                <stop offset={`${(averageRating / 5) * 100}%`} stopColor="transparent" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill="url(#grad)"
                        />
                    </svg>
                    <span className="text-xs text-gray-600 ml-1">
                        ({convertRomanToKhmer(averageRating?.toFixed(1) || "0")})
                    </span>
                </div>

                <div className="card-actions flex flex-row items-center justify-end">
                    <div className={`badge rounded-[8px] border-none py-[1px] px-2 text-[13px] ${levelClass}`}>
                        {recipe?.level}
                    </div>
                </div>
            </div>
        </div>
    );
}