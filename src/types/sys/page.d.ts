export interface advertising {
  id: number
  theme: string
  img: string
  link: string
}

export interface announcement {
  id: number
  title: string
  content: string
}

export interface slideshow {
  id: number
  status: string
  img: string
  theme: string
  link: string
}

export interface tag {
  id: number
  name: string
  log: string
}

export interface column {
  text: string
  value: string
}

export interface SelectedOptions {
  text: string
  // Add any other properties present in selectedOptions
}
