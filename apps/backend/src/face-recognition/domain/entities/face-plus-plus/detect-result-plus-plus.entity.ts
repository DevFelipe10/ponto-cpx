export type FaceRectangleDetectResult = {
  top: number
  left: number
  width: number
  height: number
}

export type FacesDetectResultProps = {
  face_token: string
  face_rectangle: FaceRectangleDetectResult
}

// export class DetectResultPlusPlusEntity extends DetectResult<DetectResultProps> {
export class DetectResultPlusPlusEntity {
  public readonly request_id: string
  public readonly time_used: number
  public readonly faces: FacesDetectResultProps[]
  public readonly image_id: string
  public readonly face_num: number

  constructor(
    request_id?: string,
    time_used?: number,
    faces?: FacesDetectResultProps[],
    image_id?: string,
    face_num?: number,
  ) {
    this.request_id = request_id
    this.time_used = time_used
    this.faces = faces
    this.image_id = image_id
    this.face_num = face_num
    // DetectResultPlusPlusEntity.validate(props)
    // super(props, id)
  }

  // static validate(props: any) {
  //   const validator = CompareResultPlusPlusValidatorFactory.create()
  //   const isValid = validator.validate(props)
  //   if (!isValid) {
  //     throw new EntityValidationError(validator.errors)
  //   }
  // }
}
