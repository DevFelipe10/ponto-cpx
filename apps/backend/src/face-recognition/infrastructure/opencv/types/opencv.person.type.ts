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
  id: string
  images: string[]
  is_bulk_insert: false | null
  name: string | null
  nationality: string | null
  notes: string | null
}
