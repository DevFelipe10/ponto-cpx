import { PersonOpencv } from 'src/face-recognition/infrastructure/opencv/types/opencv.person.type'

export class SearchPersonResult {
  count: number
  persons: PersonPaginate[]

  constructor(count: number, persons: PersonPaginate[]) {
    this.count = count
    this.persons = persons
  }
}

export class PersonPaginate {
  id: string
  name?: string = '-'
  create_date?: Date | string = '-'
  modified_date?: Date | string = '-'

  constructor(
    id: string,
    name?: string,
    create_date?: Date | string,
    modified_date?: Date | string,
  ) {
    this.id = id
    this.name = name ?? '-'
    this.create_date = create_date ? new Date(create_date) : '-'
    this.modified_date = modified_date ? new Date(modified_date) : '-'
  }
}

export class ListSearchPerson {
  totalPages: number
  total: number
  count: number
  persons: PersonPaginate[]

  constructor(searchPerson: SearchPersonResult, limit: number) {
    this.total = searchPerson.count
    this.totalPages = Math.round(this.total / limit)
    this.count = searchPerson.persons.length
    this.persons = searchPerson.persons
  }
}
