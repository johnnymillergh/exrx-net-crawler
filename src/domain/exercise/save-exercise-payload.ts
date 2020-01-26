import { IsNotEmpty } from 'class-validator'

export class SaveExercisePayload {
  @IsNotEmpty()
  exerciseGif!: File

  @IsNotEmpty()
  exerciseName!: string

  @IsNotEmpty()
  preparation!: string

  @IsNotEmpty()
  execution!: string

  @IsNotEmpty()
  comments!: string
}
