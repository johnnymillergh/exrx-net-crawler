import { IsNotEmpty } from 'class-validator'

export class ExerciseClassificationPayload {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  description!: string
}
