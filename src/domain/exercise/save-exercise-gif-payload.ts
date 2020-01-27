import { IsNotEmpty } from 'class-validator'

export class SaveExerciseGifPayload {
  @IsNotEmpty()
  exerciseId!: number

  @IsNotEmpty()
  exerciseGif!: File
}
