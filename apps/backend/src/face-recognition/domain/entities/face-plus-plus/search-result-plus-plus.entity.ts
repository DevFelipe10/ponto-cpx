// import { DetectResult } from 'src/shared/domain/entities/face-recognition/detect-result'

// export type FaceRectangleDetectResult = {
//   top: number
//   left: number
//   width: number
//   height: number
// }

// export type ThresholdsSearchResult = {
//   1e-3: number
//   1e-5: number
//   1e-4: number
// }

// export type ResultsSearchResult = {
//   confidence: number
//   user_id: string
//   face_token: string
// }

// export class SearchResultPlusPlusEntity {
//   public readonly request_id: string
//   public readonly time_used: number
//   public readonly thresholds: ThresholdsSearchResult
//   public readonly results: ResultsSearchResult[]
//   public readonly isConfidence: boolean

//   constructor(
//     request_id: string,
//     time_used: number,
//     thresholds: ThresholdsSearchResult,
//     results: ResultsSearchResult[],
//     isConfidence: boolean = true,
//   ) {
//     this.request_id = request_id
//     this.time_used = time_used
//     this.thresholds = thresholds
//     this.results = results
//     this.isConfidence = isConfidence
//   }

//   verifyConfidence() {
//     return true
//     return this.results.some(result => {
//       console.log(result)
//       return result.confidence < 0.8
//     })
//       ? false
//       : true
//   }
// }
