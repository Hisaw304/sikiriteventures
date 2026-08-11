/* ===========================
   RICE
=========================== */

import rice50 from "../assets/rice-50kg.jpg";
import rice25 from "../assets/rice-25kg.jpg";

/* ===========================
   SEMO
=========================== */

import semo10 from "../assets/semo-10kg.jpg";
import semo5 from "../assets/semo-5kg.jpg";
import semo2 from "../assets/semo-2kg.jpg";
import semo1 from "../assets/semo-1kg.jpg";
import semo500 from "../assets/semo-500g.jpg";

/* ===========================
   GROUNDNUT OIL
=========================== */

import groundnut25 from "../assets/groundnut-25l.jpg";
import groundnut5 from "../assets/groundnut-5l.jpg";
import groundnut2_5 from "../assets/groundnut-2-5l.jpg";
import groundnut1 from "../assets/groundnut-1l.jpg";

/* ===========================
   PALM OIL
=========================== */

import palm25 from "../assets/palm-25l.jpg";
import palm5 from "../assets/palm-5l.jpg";
import palm2 from "../assets/palm-2-5l.jpg";
import palm1 from "../assets/palm-1l.jpg";

/* ===========================
   SPAGHETTI
=========================== */

import spaghettiFull from "../assets/spaghetti-full.jpg";
import spaghettiHalf from "../assets/spaghetti-half.jpg";
import spaghettiQuarter from "../assets/spaghetti-quarter.jpg";

/* ===========================
   NOODLES
=========================== */

import indomie from "../assets/indomie-carton.jpg";
import mimee from "../assets/mimee-carton.jpg";

/* ===========================
   SEASONING
=========================== */

import salt from "../assets/salt-pack.jpg";

import maggi170 from "../assets/maggi-170.jpg";
import maggi50 from "../assets/maggi-50.jpg";

const products = [
  {
    id: 1,
    name: "Premium Rice",
    category: "Grains",
    description:
      "Premium quality Nigerian rice carefully selected for freshness and great taste. Perfect for everyday family meals, restaurants and bulk purchases.",

    sizes: [
      {
        id: 1,
        label: "50kg Bag",
        price: 52000,
        oldPrice: 55000,
        image: rice50,
      },
      {
        id: 2,
        label: "25kg Half Bag",
        price: 25000,
        oldPrice: 27000,
        image: rice25,
      },
    ],
  },

  {
    id: 2,
    name: "Semo",
    category: "Swallow",
    description:
      "Smooth, nutritious semolina made for soft, lump-free swallow. Available in different sizes for every household.",

    sizes: [
      {
        id: 1,
        label: "10kg",
        price: 15500,
        oldPrice: 17000,
        image: semo10,
      },
      {
        id: 2,
        label: "5kg",
        price: 7600,
        oldPrice: 8500,
        image: semo5,
      },
      {
        id: 3,
        label: "2kg",
        price: 3000,
        oldPrice: 3500,
        image: semo2,
      },
      {
        id: 4,
        label: "1kg",
        price: 1600,
        oldPrice: 1800,
        image: semo1,
      },
      {
        id: 5,
        label: "500g",
        price: 900,
        oldPrice: 1000,
        image: semo500,
      },
    ],
  },

  {
    id: 3,
    name: "Groundnut Oil",
    category: "Cooking Oil",
    description:
      "Pure, fresh groundnut oil suitable for frying, cooking and commercial food preparation.",

    sizes: [
      {
        id: 1,
        label: "25 Litres",
        price: 53000,
        oldPrice: 58000,
        image: groundnut25,
      },
      {
        id: 2,
        label: "5 Litres",
        price: 10500,
        oldPrice: 11500,
        image: groundnut5,
      },
      {
        id: 3,
        label: "2.5 Litres",
        price: 5300,
        oldPrice: 6000,
        image: groundnut2_5,
      },
      {
        id: 4,
        label: "1 Litre",
        price: 2000,
        oldPrice: 2500,
        image: groundnut1,
      },
    ],
  },

  {
    id: 4,
    name: "Palm Oil",
    category: "Cooking Oil",
    description:
      "Freshly processed palm oil with rich colour and authentic flavour for soups, stews and traditional meals.",

    sizes: [
      {
        id: 1,
        label: "25 Litres",
        price: 50000,
        oldPrice: 55000,
        image: palm25,
      },
      {
        id: 2,
        label: "5 Litres",
        price: 11000,
        oldPrice: 12500,
        image: palm5,
      },
      {
        id: 3,
        label: "2 Litres",
        price: 4000,
        oldPrice: 4500,
        image: palm2,
      },
      {
        id: 4,
        label: "1 Litre",
        price: 2000,
        oldPrice: 2300,
        image: palm1,
      },
    ],
  },

  {
    id: 5,
    name: "Spaghetti",
    category: "Pasta",
    description:
      "Delicious premium spaghetti that's easy to cook and perfect for family meals, restaurants and retailers.",

    sizes: [
      {
        id: 1,
        label: "Full Carton",
        price: 18600,
        oldPrice: 20000,
        image: spaghettiFull,
      },
      {
        id: 2,
        label: "Half Carton",
        price: 9300,
        oldPrice: 10000,
        image: spaghettiHalf,
      },
      {
        id: 3,
        label: "Quarter Carton",
        price: 4800,
        oldPrice: 5200,
        image: spaghettiQuarter,
      },
    ],
  },

  {
    id: 6,
    name: "Indomie Instant Noodles",
    category: "Noodles",
    description:
      "Nigeria's favourite instant noodles. Great taste, quick to prepare and loved by the whole family.",

    sizes: [
      {
        id: 1,
        label: "1 Carton",
        price: 9500,
        oldPrice: 10500,
        image: indomie,
      },
    ],
  },

  {
    id: 7,
    name: "Mimee Instant Noodles",
    category: "Noodles",
    description:
      "Tasty Mimee noodles made for quick, satisfying meals at home, school or work.",

    sizes: [
      {
        id: 1,
        label: "1 Carton",
        price: 8500,
        oldPrice: 9500,
        image: mimee,
      },
    ],
  },

  {
    id: 8,
    name: "Salt",
    category: "Seasoning",
    description:
      "Fine-quality table salt that brings out the flavour of every meal.",

    sizes: [
      {
        id: 1,
        label: "1 Pack",
        price: 500,
        oldPrice: 600,
        image: salt,
      },
    ],
  },

  {
    id: 9,
    name: "Maggi Chicken Cubes",
    category: "Seasoning",
    description:
      "Popular Maggi chicken seasoning cubes that add rich flavour and aroma to every dish.",

    sizes: [
      {
        id: 1,
        label: "170 Cubes Pack",
        price: 1700,
        oldPrice: 2000,
        image: maggi170,
      },
      {
        id: 2,
        label: "50 Cubes Pack",
        price: 500,
        oldPrice: 600,
        image: maggi50,
      },
    ],
  },
];

export default products;
