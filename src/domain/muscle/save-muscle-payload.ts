/* eslint-disable no-unused-vars */
import { MusclePayload } from '@/domain/muscle/muscle-payload'
import { ArrayNotEmpty, ValidateNested } from 'class-validator'

export class SaveMusclePayload {
  @ValidateNested()
  @ArrayNotEmpty()
  musclePayloadList!: Array<MusclePayload>
}
