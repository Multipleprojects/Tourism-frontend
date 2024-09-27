import tourImg01 from "../images/tour-img01.jpg";
import tourImg02 from "../images/tour-img02.jpg";
import tourImg03 from "../images/tour-img03.jpg";
import tourImg04 from "../images/tour-img04.jpg";
import tourImg05 from "../images/tour-img05.jpg";
import tourImg06 from "../images/tour-img06.jpg";
import tourImg07 from "../images/tour-img07.jpg";

const tours = [
  {
    id: "01",
    title: "Hunza Valley",
    city: "Gilgit Baltistan",
    distance: 600,
    address: 'Hunza, Gilgit Baltistan, Pakistan',
    price: 150,
    maxGroupSize: 15,
    desc: "A breathtaking valley with stunning landscapes, rich culture, and welcoming locals.",
    reviews: [
      {
        name: "Ali Khan",
        rating: 4.8,
      },
      {
        name: "Sara Ahmed",
        rating: 5,
      },
    ],
    avgRating: 4.9,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "02",
    title: "Mohenjo Daro",
    city: "Sindh",
    distance: 350,
    address: 'Mohenjo Daro, Sindh, Pakistan',
    price: 80,
    maxGroupSize: 20,
    desc: "An ancient archaeological site dating back to the Indus Valley Civilization.",
    reviews: [
      {
        name: "Raza Qureshi",
        rating: 4.7,
      },
    ],
    avgRating: 4.7,
    photo: tourImg02,
    featured: true,
  },
  {
    id: "03",
    title: "Fairy Meadows",
    city: "Gilgit Baltistan",
    distance: 700,
    address: 'Fairy Meadows, Diamer, Gilgit Baltistan, Pakistan',
    price: 200,
    maxGroupSize: 10,
    desc: "A scenic spot with mesmerizing views of Nanga Parbat, perfect for trekkers and nature lovers.",
    reviews: [
      {
        name: "Asim Malik",
        rating: 4.9,
      },
    ],
    avgRating: 4.9,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "04",
    title: "Badshahi Mosque",
    city: "Lahore",
    distance: 50,
    address: 'Badshahi Mosque, Lahore, Pakistan',
    price: 50,
    maxGroupSize: 30,
    desc: "One of the largest mosques in the world, known for its stunning Mughal architecture.",
    reviews: [
      {
        name: "Zainab Ali",
        rating: 4.6,
      },
    ],
    avgRating: 4.6,
    photo: tourImg04,
    featured: false,
  },
  {
    id: "05",
    title: "Neelum Valley",
    city: "Azad Kashmir",
    distance: 500,
    address: 'Neelum Valley, Azad Kashmir, Pakistan',
    price: 180,
    maxGroupSize: 12,
    desc: "A picturesque valley known for its lush greenery and flowing rivers.",
    reviews: [
      {
        name: "Faisal Javed",
        rating: 4.8,
      },
    ],
    avgRating: 4.8,
    photo: tourImg05,
    featured: true,
  },
  {
    id: "06",
    title: "Karakoram Highway",
    city: "Multiple",
    distance: 1200,
    address: 'Karakoram Highway, Pakistan',
    price: 250,
    maxGroupSize: 20,
    desc: "The highest paved international road in the world, offering stunning mountain views.",
    reviews: [
      {
        name: "Amna Rafiq",
        rating: 4.7,
      },
    ],
    avgRating: 4.7,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "07",
    title: "Shandur Pass",
    city: "Khyber Pakhtunkhwa",
    distance: 800,
    address: 'Shandur, Khyber Pakhtunkhwa, Pakistan',
    price: 200,
    maxGroupSize: 10,
    desc: "The highest polo ground in the world, surrounded by majestic mountains.",
    reviews: [
      {
        name: "Hassan Raza",
        rating: 4.6,
      },
    ],
    avgRating: 4.6,
    photo: tourImg07,
    featured: false,
  },
  {
    id: "08",
    title: "Ranikot Fort",
    city: "Sindh",
    distance: 400,
    address: 'Ranikot Fort, Jamshoro, Sindh, Pakistan',
    price: 100,
    maxGroupSize: 25,
    desc: "Known as the 'Great Wall of Sindh', it is one of the largest forts in the world.",
    reviews: [
      {
        name: "Bilal Ahmed",
        rating: 4.5,
      },
    ],
    avgRating: 4.5,
    photo: tourImg03,
    featured: false,
  },
];


export default tours;
