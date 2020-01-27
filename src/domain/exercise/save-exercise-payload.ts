/* eslint-disable no-unused-vars */
import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from 'class-validator'
import { ExerciseRelatedClassificationPayload } from '@/domain/exercise/exercise-related-classification-payload'
import { ExerciseRelatedMusclePayload } from '@/domain/exercise/exercise-related-muscle-payload'

export class SaveExercisePayload {
  @IsNotEmpty()
  exerciseName!: string

  @ValidateNested()
  @ArrayNotEmpty()
  exerciseRelatedClassificationPayloadList = [] as ExerciseRelatedClassificationPayload[]

  @IsNotEmpty()
  preparation!: string

  @IsNotEmpty()
  execution!: string

  @IsNotEmpty()
  comments!: string

  @ValidateNested()
  @ArrayNotEmpty()
  exerciseRelatedMusclePayloadList = [] as ExerciseRelatedMusclePayload[]
}
