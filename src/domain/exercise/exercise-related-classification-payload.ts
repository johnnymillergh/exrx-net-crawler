import { IsNotEmpty } from 'class-validator'

export class ExerciseRelatedClassificationPayload {
  @IsNotEmpty()
  classificationName!: string

  @IsNotEmpty()
  exerciseRelatedClassificationType!: number
}
