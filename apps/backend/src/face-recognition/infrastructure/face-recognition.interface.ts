export interface FaceRecognitionInterface<T> {
  detectFaces(imageData: string): Promise<T>
  addFace(personId: string, imageUrl: string): Promise<T>
  searchFace(faceId: string): Promise<T>
  setUserId(userId: string, faceId: string): Promise<T>
}
