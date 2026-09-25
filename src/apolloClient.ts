import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Observable,
  type FetchResult,
  type Operation,
} from "@apollo/client";
import { mockBooks, mockReviews, mockUsers } from "./mockData";

const getMockResponse = (operation: Operation): FetchResult => {
  const variables = operation.variables as Record<string, any>;

  switch (operation.operationName) {
    case "GetBooks": {
      const options = variables.options ?? {};
      const searchTerm = (variables.searchTerm ?? "").toLowerCase();
      const authorTerm = (variables.searchTermAuthor ?? "").toLowerCase();
      const genre = (variables.genre ?? "").toLowerCase();
      const userId = variables.userId;
      const books = mockBooks
        .filter((book) => {
          const matchesSearch =
            !searchTerm && !authorTerm
              ? true
              : book.title.toLowerCase().includes(searchTerm) ||
                book.author.name.toLowerCase().includes(authorTerm);
          const matchesGenre = !genre || book.genre.toLowerCase().includes(genre);
          const matchesUser =
            !userId || book.favoritedBy.some((user) => user.id === userId);
          return matchesSearch && matchesGenre && matchesUser;
        })
        .sort((first, second) => {
          const field = Object.keys(options.sort ?? {})[0] ?? "title";
          const direction = options.sort?.[field] === "DESC" ? -1 : 1;
          return String(first[field as keyof typeof first]).localeCompare(
            String(second[field as keyof typeof second]),
          ) * direction;
        });
      const offset = options.offset ?? 0;
      const limit = options.limit ?? books.length;
      return { data: { books: books.slice(offset, offset + limit) } };
    }
    case "GetReviews": {
      const bookId = variables.where?.book?.id;
      return {
        data: {
          reviews: mockReviews.filter((review) => review.bookId === bookId),
        },
      };
    }
    case "CheckUser":
      return {
        data: {
          user: mockUsers.has(variables.userId) ? { id: variables.userId } : null,
        },
      };
    case "AddUser":
      mockUsers.add(variables.addUserId);
      return { data: { addUser: { id: variables.addUserId } } };
    case "AddReview": {
      const review = {
        id: `review-${mockReviews.length + 1}`,
        bookId: variables.bookId,
        name: variables.name,
        stars: variables.stars,
        comment: variables.comment,
      };
      mockReviews.push(review);
      return { data: { addReview: review } };
    }
    case "favoriteBook": {
      const book = mockBooks.find((item) => item.id === variables.bookId);
      if (book && !book.favoritedBy.some((user) => user.id === variables.userId)) {
        book.favoritedBy.push({ id: variables.userId });
      }
      return {
        data: {
          favoriteBook: {
            id: variables.userId,
            favorites: [{ id: variables.bookId }],
          },
        },
      };
    }
    case "unfavoriteBook": {
      const book = mockBooks.find((item) => item.id === variables.bookId);
      if (book) {
        book.favoritedBy = book.favoritedBy.filter(
          (user) => user.id !== variables.userId,
        );
      }
      return {
        data: { unfavoriteBook: { id: variables.userId, favorites: [] } },
      };
    }
    default:
      return { data: {} };
  }
};

const mockLink = new ApolloLink(
  (operation) =>
    new Observable((observer) => {
      observer.next(getMockResponse(operation));
      observer.complete();
    }),
);

const client = new ApolloClient({
  link: mockLink,
  cache: new InMemoryCache(),
});

export { ApolloProvider, client };


// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "http://localhost:3001",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   cache: new InMemoryCache(),
// });

// export { ApolloProvider, client };
