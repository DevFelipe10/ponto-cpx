import { CollectionOpencv } from './opencv.collections.type'

export enum GenderEnumOpencv {
  Male = 'M',
  Female = 'F',
}

export type ThumbnailOpencv = {
  id: string
  thumbnail: string
}

export type PersonOpencv = {
  id: string
  name: string | null
  thumbnails: ThumbnailOpencv[]
  gender: GenderEnumOpencv | null
  date_of_birth: string | null
  nationality: string | null
  score: number | undefined
  collections: CollectionOpencv[]
  notes: string | null
  create_date: Date
  modified_date: Date
}

export type PersonCreateOpencv = {
  collections: string[] | null
  date_of_birth: string | null
  gender: GenderEnumOpencv | null
  id: string | null
  images: string[]
  is_bulk_insert: false | null
  name: string
  nationality: string | null
  notes: string | null
}

export type SearchPersonResultOpencv = {
  count: number
  persons: PersonOpencv[]
}

// export class SearchPersonOpencv {
//   id: string
//   name: string | null
//   create_date: Date
//   modified_date: Date

//   constructor(person: PersonOpencv) {
//     // this.id = person.id // "id" é interno da opencv
//     this.id = person.name // Usa o "name" para obter o ID da Matricula
//     // this.name = person.name
//     this.create_date = person.create_date
//     this.modified_date = person.modified_date
//   }
// }

// export class ListSearchPersonOpencv {
//   totalPages: number
//   total: number
//   count: number
//   persons: SearchPersonOpencv[]

//   constructor(searchPerson: SearchPersonResultOpencv, limit: number) {
//     this.total = searchPerson.count
//     this.totalPages = Math.round(this.total / limit)
//     this.count = searchPerson.persons.length
//     this.persons = searchPerson.persons.map<SearchPersonOpencv>(
//       person => new SearchPersonOpencv(person),
//     )
//   }
// }
