export type BookItem = {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    description?: string
    publisher?: string
    imageLinks?: {
      smallThumbnail: string
      thumbnail: string
    }
    previewLink?: string
  }
}
