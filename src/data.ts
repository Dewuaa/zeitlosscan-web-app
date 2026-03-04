export interface Chapter {
  num: number;
  date: string;
  views?: string;
  hot?: boolean;
}

export interface Manga {
  id: number;
  title: string;
  cover: string;
  rating?: number;
  type: "Manhwa" | "Manga" | "Novel" | "Comic";
  status?: string;
  description?: string;
  genres?: string;
  chapters?: Chapter[];
  views?: string;
  completed?: boolean;
}

export const heroMangas: Manga[] = [
  {
    id: 1,
    title: "The Youngest Hides a Lot",
    cover: "https://static.comix.to/6f8f/i/1/21/693d7916e3088.jpg",
    type: "Manhwa",
    status: "ONGOING",
    description:
      "I knew from the beginning that you and I would end up like this someday. The youngest daughter of the prestigious family hides...",
  },
  {
    id: 2,
    title:
      "It Feels Like I'm About to be Divorced, But My Husband is My Favorite",
    cover: "https://m.media-amazon.com/images/I/91OGBsB9e0L.jpg",
    type: "Manhwa",
    status: "ONGOING",
    description:
      "I was reincarnated inside a romance fantasy novel as the female lead's rival, destined to face ruin and be cast away...",
  },
  {
    id: 3,
    title: "I Thought I Was The Main Character",
    cover:
      "https://manhwatop.com/wp-content/uploads/2024/09/Im-a-Worthless-Stepmother-But-I-Love-My-Family-Madly.jpg",
    type: "Manhwa",
    status: "ONGOING",
    description:
      "I held my swollen belly with my second child and heard the news of my husband's marriage. It was a...",
  },
  {
    id: 4,
    title: "I Picked Up A Crazy Oppo",
    cover: "https://static.comix.to/af61/i/0/9f/68e09298117c5.jpg",
    type: "Manhwa",
    status: "ONGOING",
    description:
      "I was reincarnated into a book. And not just anywhere—I was reborn with the same rare illness as t...",
  },
  {
    id: 5,
    title: "I'm The Only One Who Doesn't Know That...",
    cover:
      "https://preview.redd.it/new-manhwa-recommendations-im-the-only-one-who-doesnt-know-v0-g7sv8iuf3pcg1.jpeg?width=640&crop=smart&auto=webp&s=04c725ecf530f10eb4b4e227b1728cf085bf1025",
    type: "Manhwa",
    status: "ONGOING",
    description:
      "I was reincarnated into a book. And not just anywhere—I was reborn with the same rare illness as t...",
  },
  {
    id: 6,
    title: "I Will Become Part of the Dark...",
    cover:
      "https://preview.redd.it/new-series-the-legendary-assassin-reincarnated-as-the-v0-yutkjvdx1uid1.png?width=1080&format=png&auto=webp&s=202a688400a2a973442ab5ec39931a1753eebec9",
    type: "Comic",
    status: "ONGOING",
    description:
      "I was reincarnated into a book. And not just anywhere—I was reborn with the same rare illness as t...",
  },
  {
    id: 7,
    title: "I Got Trapped to the Mind Stone",
    cover: "https://cdn.wuxiaworld.eu/original/Run-Away-From-Me.jpg",
    type: "Manhwa",
    status: "ONGOING",
    description:
      "Trapped in a mystical realm, only the mind stone holds the key to escape...",
  },
];

export const trendingMangas: Manga[] = [
  {
    id: 1,
    title: "I'm a Worthless Stepmother...",
    cover:
      "https://manhwatop.com/wp-content/uploads/2024/09/Im-a-Worthless-Stepmother-But-I-Love-My-Family-Madly.jpg",
    type: "Manhwa",
    genres: "Fantasy, Romance",
  },
  {
    id: 2,
    title: "I Can't Stop Dating the E...",
    cover:
      "https://i.redd.it/new-colored-manga-just-dropped-i-cant-stop-doting-the-v0-qpx1d7cfntkd1.jpg?width=2512&format=pjpg&auto=webp&s=eec5e035457f6217b7032d406640e6ced4fa9a2d",
    type: "Manhwa",
    genres: "Romance, Thriller",
  },
  {
    id: 3,
    title: "The Legendary Assassin",
    cover:
      "https://preview.redd.it/new-series-the-legendary-assassin-reincarnated-as-the-v0-yutkjvdx1uid1.png?width=600&format=png&auto=webp&s=202a688400a2a973442ab5ec39931a1753eebec9",
    type: "Manhwa",
    genres: "Fantasy, Romance",
  },
  {
    id: 4,
    title: "The Remarried Empress",
    cover: "https://m.media-amazon.com/images/I/91OGBsB9e0L.jpg",
    type: "Manhwa",
    genres: "Josei, Romance",
  },
  {
    id: 5,
    title: "I Still Don't Know About M...",
    cover:
      "https://i.pinimg.com/736x/75/2d/84/752d843dac5a97db1ef0831198bbc47f.jpg",
    type: "Manhwa",
    genres: "Fantasy, Romance",
  },
  {
    id: 6,
    title: "Honey, Why Can't We Di...",
    cover: "https://cdn.wuxiaworld.eu/original/Run-Away-From-Me.jpg",
    type: "Manhwa",
    genres: "Fantasy, Comedy",
  },
];

export const pinnedSeries: Manga[] = [
  {
    id: 1,
    title: "A Crazy Oppo",
    cover: "https://static.comix.to/af61/i/0/9f/68e09298117c5.jpg",
    type: "Manhwa",
    chapters: [
      { num: 21, date: "4 days ago", views: "16.9K" },
      { num: 20, date: "Mar 14, 2026", views: "6.5K" },
    ],
  },
  {
    id: 2,
    title: "Golden Chronicles",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zjHnoVxm3FfLTQHbx6X3GPW9kj7gu0E9rA&s",
    type: "Manhwa",
    chapters: [
      { num: 26, date: "Jan 14, 2026", views: "19.7K" },
      { num: 25, date: "Jan 14, 2026", views: "8.4K" },
    ],
  },
  {
    id: 3,
    title: "I'm a Worthless Stepmother, But I Love...",
    cover:
      "https://manhwatop.com/wp-content/uploads/2024/09/Im-a-Worthless-Stepmother-But-I-Love-My-Family-Madly.jpg",
    type: "Manhwa",
    chapters: [
      { num: 38, date: "4 hours ago", views: "12.1K", hot: true },
      { num: 37, date: "Jan 12, 2026", views: "10.3K" },
    ],
  },
  {
    id: 4,
    title: "I Picked Up A Crazy Oppo",
    cover: "https://static.comix.to/af61/i/0/9f/68e09298117c5.jpg",
    type: "Manhwa",
    chapters: [
      { num: 15, date: "4 days ago", views: "21.3K" },
      { num: 14, date: "Mar 8, 2026", views: "9.1K" },
    ],
  },
  {
    id: 5,
    title: "This is My Second and Real First Love",
    cover:
      "https://i.redd.it/new-series-this-marriage-is-bound-to-fail-anyway-the-broken-v0-fin0o8pszc891.jpg?width=420&format=pjpg&auto=webp&s=121de84147a595272f9dad406911ba844af4bae1",
    type: "Manhwa",
    chapters: [
      { num: 42, date: "4 hours ago", views: "15.6K", hot: true },
      { num: 41, date: "Jan 7, 2026", views: "11.2K" },
    ],
  },
  {
    id: 6,
    title: "Even If She Hides Her Power, the Noble Lady L...",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZ7UM_y1PQy_1hI6Sb1J38Hl6ipj1XBeAvQ&s",
    type: "Manhwa",
    chapters: [
      { num: 31, date: "Jan 16, 2026", views: "18.5K" },
      { num: 30, date: "Jan 8, 2026", views: "7.8K" },
    ],
  },
  {
    id: 7,
    title: "Sudden Downfall – Return to Countdown-II",
    cover:
      "https://preview.redd.it/new-series-the-legendary-assassin-reincarnated-as-the-v0-yutkjvdx1uid1.png?width=600&format=png&auto=webp&s=202a688400a2a973442ab5ec39931a1753eebec9",
    type: "Manhwa",
    chapters: [
      { num: 19, date: "Jan 14, 2026", views: "13.2K" },
      { num: 18, date: "Jan 6, 2026", views: "5.9K" },
    ],
  },
  {
    id: 8,
    title: "It's Time to Look for a New Family",
    cover:
      "https://i.pinimg.com/736x/75/2d/84/752d843dac5a97db1ef0831198bbc47f.jpg",
    type: "Manhwa",
    chapters: [
      { num: 76, date: "4 hours ago", views: "24.1K", hot: true },
      { num: 75, date: "Jan 10, 2026", views: "14.7K" },
    ],
  },
];

export const latestUpdates: Manga[] = [
  {
    id: 1,
    title: "I'm a Worthless Stepmother, But I Love My Family Madly",
    cover:
      "https://manhwatop.com/wp-content/uploads/2024/09/Im-a-Worthless-Stepmother-But-I-Love-My-Family-Madly.jpg",
    type: "Manhwa",
    chapters: [
      { num: 74, date: "2 hours ago", views: "42.5K", hot: true },
      { num: 73, date: "Jan 10, 2026", views: "14.7K" },
      { num: 72, date: "Jan 4, 2026", views: "12.3K" },
    ],
  },
  {
    id: 2,
    title: "This is My Second and Real First Love",
    cover:
      "https://i.redd.it/new-series-this-marriage-is-bound-to-fail-anyway-the-broken-v0-fin0o8pszc891.jpg?width=420&format=pjpg&auto=webp&s=121de84147a595272f9dad406911ba844af4bae1",
    type: "Manhwa",
    chapters: [
      { num: 42, date: "5 hours ago", views: "18.2K", hot: true },
      { num: 41, date: "Jan 7, 2026", views: "11.2K" },
      { num: 40, date: "Jan 2, 2026", views: "9.8K" },
    ],
  },
  {
    id: 3,
    title: "Golden Downfall",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zjHnoVxm3FfLTQHbx6X3GPW9kj7gu0E9rA&s",
    type: "Manhwa",
    chapters: [
      { num: 24, date: "1 day ago", views: "16.9K", hot: true },
      { num: 23, date: "1 day ago", views: "8.4K" },
      { num: 22, date: "Dec 30, 2025", views: "6.1K" },
    ],
  },
  {
    id: 4,
    title: "It's Time to Look for a New Family",
    cover:
      "https://i.pinimg.com/736x/75/2d/84/752d843dac5a97db1ef0831198bbc47f.jpg",
    type: "Manhwa",
    chapters: [
      { num: 76, date: "12 hours ago", views: "24.1K", hot: true },
      { num: 75, date: "Jan 10, 2026", views: "14.7K" },
      { num: 74, date: "Jan 5, 2026", views: "11.9K" },
    ],
  },
  {
    id: 5,
    title: "The Remarried Empress",
    cover: "https://m.media-amazon.com/images/I/91OGBsB9e0L.jpg",
    type: "Manhwa",
    chapters: [
      { num: 244, date: "Jan 13, 2026", views: "18.5K" },
      { num: 243, date: "Jan 6, 2026", views: "12.7K" },
    ],
  },
  {
    id: 6,
    title: "The Circumstances of Being Chosen as Th...",
    cover:
      "https://preview.redd.it/new-series-the-legendary-assassin-reincarnated-as-the-v0-yutkjvdx1uid1.png?width=600&format=png&auto=webp&s=202a688400a2a973442ab5ec39931a1753eebec9",
    type: "Manhwa",
    chapters: [
      { num: 37, date: "Jan 15, 2026", views: "14.2K" },
      { num: 36, date: "Jan 8, 2026", views: "10.1K" },
    ],
  },
  {
    id: 7,
    title: "I Was Supposed to Be a Noble Lady, but...",
    cover: "https://static.comix.to/af61/i/0/9f/68e09298117c5.jpg",
    type: "Manhwa",
    chapters: [
      { num: 31, date: "4 hours ago", views: "19.3K", hot: true },
      { num: 30, date: "Jan 9, 2026", views: "13.6K" },
    ],
  },
  {
    id: 8,
    title: "Marriage Statute of Limitations",
    cover: "https://static.comix.to/6f8f/i/1/21/693d7916e3088.jpg",
    type: "Manhwa",
    chapters: [
      { num: 54, date: "Jan 14, 2026", views: "17.8K" },
      { num: 53, date: "Jan 7, 2026", views: "11.4K" },
    ],
  },
  {
    id: 9,
    title: "This Time, I'll Seduce the Cold-heart...",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZ7UM_y1PQy_1hI6Sb1J38Hl6ipj1XBeAvQ&s",
    type: "Manhwa",
    chapters: [
      { num: 21, date: "Jan 12, 2026", views: "15.1K" },
      { num: 20, date: "Jan 5, 2026", views: "9.7K" },
    ],
  },
  {
    id: 10,
    title: "I Wish My Husband Were Dead",
    cover:
      "https://i.redd.it/new-colored-manga-just-dropped-i-cant-stop-doting-the-v0-qpx1d7cfntkd1.jpg?width=2512&format=pjpg&auto=webp&s=eec5e035457f6217b7032d406640e6ced4fa9a2d",
    type: "Manhwa",
    chapters: [
      { num: 8, date: "Jan 11, 2026", views: "22.4K" },
      { num: 7, date: "Jan 4, 2026", views: "16.2K" },
    ],
  },
  {
    id: 11,
    title: "The Count's Secret Maid",
    cover: "https://m.media-amazon.com/images/I/91OGBsB9e0L.jpg",
    type: "Manhwa",
    chapters: [
      { num: 45, date: "Jan 13, 2026", views: "13.9K" },
      { num: 44, date: "Jan 6, 2026", views: "8.6K" },
    ],
  },
  {
    id: 12,
    title: "Pretend Villainess to a Dating Happiness The...",
    cover: "https://cdn.wuxiaworld.eu/original/Run-Away-From-Me.jpg",
    type: "Manhwa",
    chapters: [
      { num: 17, date: "Jan 10, 2026", views: "11.7K" },
      { num: 16, date: "Jan 3, 2026", views: "7.3K" },
    ],
  },
];

export const editorsChoice: Manga = {
  id: 100,
  title: "I Became My First Love's Divorce Law...",
  cover:
    "https://manhwatop.com/wp-content/uploads/2025/03/I-Became-a-Divorce-Lawyer-for-My-First-Love-cover.webp",
  type: "Novel",
  description:
    "Mori Ryueoni left behind her successful career as a popular actress and chose a marital dream of a happy family. However, her dream came to an end when her husband betrayed her. Now determined to divorce, the only thing Mori needs is to secure custody of...",
};

export const editorsChoiceThumbs: Manga[] = [
  {
    id: 101,
    title: "Hidden Memories",
    cover: "https://static.comix.to/af61/i/0/9f/68e09298117c5.jpg",
    type: "Manhwa",
  },
  {
    id: 102,
    title: "The Youngest Hides",
    cover: "https://static.comix.to/6f8f/i/1/21/693d7916e3088.jpg",
    type: "Manhwa",
  },
  {
    id: 103,
    title: "Golden Downfall",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zjHnoVxm3FfLTQHbx6X3GPW9kj7gu0E9rA&s",
    type: "Manhwa",
  },
  {
    id: 104,
    title: "Dark Chronicles",
    cover:
      "https://i.redd.it/new-series-this-marriage-is-bound-to-fail-anyway-the-broken-v0-fin0o8pszc891.jpg?width=420&format=pjpg&auto=webp&s=121de84147a595272f9dad406911ba844af4bae1",
    type: "Manhwa",
  },
  {
    id: 105,
    title: "Lost Empire",
    cover: "https://m.media-amazon.com/images/I/91OGBsB9e0L.jpg",
    type: "Manhwa",
  },
  {
    id: 106,
    title: "Crown of Fire",
    cover:
      "https://preview.redd.it/new-series-the-legendary-assassin-reincarnated-as-the-v0-yutkjvdx1uid1.png?width=600&format=png&auto=webp&s=202a688400a2a973442ab5ec39931a1753eebec9",
    type: "Manhwa",
  },
  {
    id: 107,
    title: "Silver Moon",
    cover:
      "https://i.pinimg.com/736x/75/2d/84/752d843dac5a97db1ef0831198bbc47f.jpg",
    type: "Manhwa",
  },
  {
    id: 108,
    title: "Eternal Vow",
    cover: "https://cdn.wuxiaworld.eu/original/Run-Away-From-Me.jpg",
    type: "Manhwa",
  },
];

export const blackAndWhiteManga: Manga[] = [
  {
    id: 201,
    title: "Pretend Villainess to a Dating...",
    cover: "https://static.comix.to/af61/i/0/9f/68e09298117c5.jpg",
    type: "Manga",
    genres: "Josei, Comic",
  },
  {
    id: 202,
    title: "The Cold Marquis and His Fe...",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zjHnoVxm3FfLTQHbx6X3GPW9kj7gu0E9rA&s",
    type: "Manga",
    genres: "Josei, Manga",
  },
  {
    id: 203,
    title: "False Holy Maiden Anthology",
    cover:
      "https://i.redd.it/new-series-this-marriage-is-bound-to-fail-anyway-the-broken-v0-fin0o8pszc891.jpg?width=420&format=pjpg&auto=webp&s=121de84147a595272f9dad406911ba844af4bae1",
    type: "Manga",
    genres: "Manga",
  },
  {
    id: 204,
    title: "The Villainess Was An Old Lad...",
    cover: "https://m.media-amazon.com/images/I/91OGBsB9e0L.jpg",
    type: "Manga",
    genres: "Action, Comedy",
  },
  {
    id: 205,
    title: "Fire Rose: Reincarnated From Mo...",
    cover:
      "https://preview.redd.it/new-series-the-legendary-assassin-reincarnated-as-the-v0-yutkjvdx1uid1.png?width=600&format=png&auto=webp&s=202a688400a2a973442ab5ec39931a1753eebec9",
    type: "Manga",
    genres: "Action, Fantasy",
  },
  {
    id: 206,
    title: "The Obsessed Neighbor and L...",
    cover:
      "https://i.pinimg.com/736x/75/2d/84/752d843dac5a97db1ef0831198bbc47f.jpg",
    type: "Manga",
    genres: "Romance, Drama",
  },
];

export const completedSeries: Manga[] = [
  {
    id: 301,
    title: "Hidden Memories",
    cover: "https://static.comix.to/6f8f/i/1/21/693d7916e3088.jpg",
    type: "Manhwa",
    genres: "Youth, School Life",
    completed: true,
  },
  {
    id: 302,
    title: "Back Where The Heart Belongs",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zjHnoVxm3FfLTQHbx6X3GPW9kj7gu0E9rA&s",
    type: "Manhwa",
    genres: "Slice of Life, Romance",
    completed: true,
  },
  {
    id: 303,
    title: "My Affectionate Beast",
    cover: "https://static.comix.to/af61/i/0/9f/68e09298117c5.jpg",
    type: "Manhwa",
    genres: "Shoujo, Romance",
    completed: true,
  },
  {
    id: 304,
    title: "The Indomitable Heart Mandin",
    cover:
      "https://i.redd.it/new-series-this-marriage-is-bound-to-fail-anyway-the-broken-v0-fin0o8pszc891.jpg?width=420&format=pjpg&auto=webp&s=121de84147a595272f9dad406911ba844af4bae1",
    type: "Manhwa",
    genres: "Josei, Fantasy",
    completed: true,
  },
  {
    id: 305,
    title: "Don't Do This, Your Majesty!",
    cover: "https://m.media-amazon.com/images/I/91OGBsB9e0L.jpg",
    type: "Manhwa",
    genres: "Josei, Fantasy",
    completed: true,
  },
  {
    id: 306,
    title: "Jams, Jams",
    cover:
      "https://preview.redd.it/new-series-the-legendary-assassin-reincarnated-as-the-v0-yutkjvdx1uid1.png?width=600&format=png&auto=webp&s=202a688400a2a973442ab5ec39931a1753eebec9",
    type: "Manhwa",
    genres: "Josei, Drama",
    completed: true,
  },
  {
    id: 307,
    title: "Legal Scandal - Divorced Feline",
    cover: "https://cdn.wuxiaworld.eu/original/Run-Away-From-Me.jpg",
    type: "Manhwa",
    genres: "Comice, Josei",
    completed: true,
  },
];

export const novels: Manga[] = [
  {
    id: 401,
    title: "I Became My First Love's Divorce Lawyer",
    cover:
      "https://manhwatop.com/wp-content/uploads/2025/03/I-Became-a-Divorce-Lawyer-for-My-First-Love-cover.webp",
    type: "Novel",
  },
];
