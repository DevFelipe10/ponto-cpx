// // import { SetUserIdResult } from 'src/shared/domain/entities/face-recognition/set-user-id'

// // export type SetUserIdResultProps = {
// //   face_token: string
// //   user_id: string
// // }

// // {
// // 	"user_id": "123",
// // 	"request_id": "1737644899,9acf8bcd-34a6-4f0a-8cdb-e969432c4f8c",
// // 	"time_used": 44,
// // 	"face_token": "18b38f0b121fe35a665c5c81a9ebf848"
// // }

// export class SetUserIdResultPlusPlusEntity {
//   public readonly request_id: string
//   public readonly user_id: string
//   public readonly time_use: string
//   public readonly face_token: string

//   constructor(
//     request_id: string,
//     user_id: string,
//     time_used: string,
//     face_token: string,
//   ) {
//     this.request_id = request_id
//     this.user_id = user_id
//     this.time_use = time_used
//     this.face_token = face_token
//   }

//   // static validate(props: any) {
//   //   const validator = CompareResultPlusPlusValidatorFactory.create()
//   //   const isValid = validator.validate(props)
//   //   if (!isValid) {
//   //     throw new EntityValidationError(validator.errors)
//   //   }
//   // }
// }
