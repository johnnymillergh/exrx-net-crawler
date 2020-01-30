import { IsDefined, Min } from 'class-validator'

export class GetByIdPayload {
  @Min(1)
  @IsDefined()
  id!: number
}
