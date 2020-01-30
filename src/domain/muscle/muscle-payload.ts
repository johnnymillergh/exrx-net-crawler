import { IsNotEmpty, IsOptional, Min } from 'class-validator'

export class MusclePayload {
  @IsNotEmpty()
  name!: string

  otherName?: string

  @Min(1)
  @IsOptional()
  parentId?: number

  @Min(1)
  @IsOptional()
  bodyPartId?: number
}
