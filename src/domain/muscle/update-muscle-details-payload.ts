import { IsNotEmpty } from 'class-validator'

export class UpdateMuscleDetailsPayload {
  muscleImageList = [] as File[]

  @IsNotEmpty()
  name!: string

  otherNames?: string[]

  relatedMuscleNameList?: string[]
}
