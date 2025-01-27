// import { Injectable } from '@nestjs/common'
// import { ApiService } from 'src/shared/infrastructure/api-client/api.service'
// import { FaceRecognitionInterface } from '../../face-recognition.interface'

// @Injectable()
// export class AzureService implements FaceRecognitionInterface {
//   private readonly baseUrl = 'https://api.facial-recognition.com/v1' // URL base da API

//   constructor(private readonly apiService: ApiService) {}

//   // Detectar rostos em uma imagem
//   async detectFaces(imageUrl: string): Promise<any> {
//     const endpoint = `${this.baseUrl}/detect`
//     const headers = { Authorization: `Bearer YOUR_API_KEY` }
//     const body = { image: imageUrl }

//     return this.apiService.post(endpoint, body, headers)
//   }

//   // Adicionar rosto ao banco de dados
//   async addFace(personId: string, imageUrl: string): Promise<any> {
//     const endpoint = `${this.baseUrl}/add`
//     const headers = { Authorization: `Bearer YOUR_API_KEY` }
//     const body = { personId, image: imageUrl }

//     return this.apiService.post(endpoint, body, headers)
//   }

//   // Remover rosto do banco de dados
//   async deleteFace(faceId: string): Promise<any> {
//     const endpoint = `${this.baseUrl}/delete/${faceId}`
//     const headers = { Authorization: `Bearer YOUR_API_KEY` }

//     return this.apiService.delete(endpoint, headers)
//   }
// }
