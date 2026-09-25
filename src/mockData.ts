export interface MockBook {
  id: string;
  title: string;
  author: { name: string };
  cover: string;
  description: string;
  genre: string;
  publication_date: string;
  isbn13: string;
  favoritedBy: { id: string }[];
}

export interface MockReview {
  id: string;
  bookId: string;
  name: string;
  stars: number;
  comment: string;
}

export const mockBooks: MockBook[] = [
  {
    id: "book-1",
    title: "The Great Gatsby",
    author: { name: "F. Scott Fitzgerald" },
    cover: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    description: "A portrait of ambition, love, and the American dream.",
    genre: "Classic",
    publication_date: "1925",
    isbn13: "9780743273565",
    favoritedBy: [],
  },
  {
    id: "book-2",
    title: "Pride and Prejudice",
    author: { name: "Jane Austen" },
    cover: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    description: "A witty story about first impressions and lasting love.",
    genre: "Romance",
    publication_date: "1813",
    isbn13: "9780141439518",
    favoritedBy: [],
  },
  {
    id: "book-3",
    title: "The Hobbit",
    author: { name: "J. R. R. Tolkien" },
    cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
    description: "Bilbo Baggins leaves home for an unexpected adventure.",
    genre: "Fantasy",
    publication_date: "1937",
    isbn13: "9780547928227",
    favoritedBy: [],
  },
  {
    id: "book-4",
    title: "1984",
    author: { name: "George Orwell" },
    cover: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    description: "A chilling vision of surveillance and controlled truth.",
    genre: "Dystopian",
    publication_date: "1949",
    isbn13: "9780451524935",
    favoritedBy: [],
  },
  {
    id: "book-5",
    title: "The Midnight Library",
    author: { name: "Matt Haig" },
    cover: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
    description: "A magical library offers a chance to explore different lives.",
    genre: "Fiction",
    publication_date: "2020",
    isbn13: "9780525559474",
    favoritedBy: [],
  },
  {
    id: "book-6",
    title: "Educated",
    author: { name: "Tara Westover" },
    cover: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
    description: "A memoir about education, family, and finding your own voice.",
    genre: "Memoir",
    publication_date: "2018",
    isbn13: "9780399590504",
    favoritedBy: [],
  },
];

export const mockReviews: MockReview[] = [
  {
    id: "review-1",
    bookId: "book-1",
    name: "Alex",
    stars: 5,
    comment: "Beautifully written and still remarkably relevant.",
  },
  {
    id: "review-2",
    bookId: "book-3",
    name: "Sam",
    stars: 4,
    comment: "A warm, adventurous read with a lot of heart.",
  },
];

export const mockUsers = new Set<string>();
