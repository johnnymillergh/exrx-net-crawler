/* eslint-disable no-unused-vars */
import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from 'class-validator'
import { ExerciseRelatedClassificationPayload } from '@/domain/exercise/exercise-related-classification-payload'

export class SaveExercisePayload {
  @IsNotEmpty()
  exerciseGif!: File

  @ValidateNested()
  @ArrayNotEmpty()
  exerciseRelatedClassificationPayloadList = [] as ExerciseRelatedClassificationPayload[]

  @IsNotEmpty()
  exerciseName!: string

  @IsNotEmpty()
  preparation!: string

  @IsNotEmpty()
  execution!: string

  @IsNotEmpty()
  comments!: string
}
