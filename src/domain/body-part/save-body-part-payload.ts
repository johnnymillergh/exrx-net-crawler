import { ArrayNotEmpty } from 'class-validator'

export class SaveBodyPartPayload {
  @ArrayNotEmpty({ message: 'The body part name list is not empty.' })
  bodyPartNameList!: string[]
}
