// import { EntityValidationError } from 'src/shared/domain/errors/validation-error'
// import { CompareResult } from '../../../../shared/domain/entities/face-recognition/compare-result'
// import { CompareResultPlusPlusValidatorFactory } from '../validators/compare-result-plus-plus.validator'

// export type thresholdsPlusPlus = {
//   1e-3: number
//   1e-4: number
//   1e-5: number
// }

// export type CompareResultPlusPlusProps = {
//   time_user: number
//   thresholds: thresholdsPlusPlus
//   teste: string
// }

// export class CompareResultPlusPlusEntity extends CompareResult<CompareResultPlusPlusProps> {
//   constructor(
//     public readonly props: CompareResultPlusPlusProps,
//     id?: string,
//     confidence?: number,
//   ) {
//     super(props, id, confidence)
//   }

//   // static validate(props: CompareResultPlusPlusProps) {
//   //   const validator = CompareResultPlusPlusValidatorFactory.create()
//   //   const isValid = validator.validate(props)
//   //   if (!isValid) {
//   //     throw new EntityValidationError(validator.errors)
//   //   }
//   // }
// }
