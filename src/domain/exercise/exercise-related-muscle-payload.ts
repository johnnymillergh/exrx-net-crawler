import { IsNotEmpty } from 'class-validator'

export class ExerciseRelatedMusclePayload {
  @IsNotEmpty()
  muscleName!: string

  @IsNotEmpty()
  relatedMuscleType!: number
}
