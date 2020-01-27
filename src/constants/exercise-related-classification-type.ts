/**
 * Enum
 * @author Johnny Miller (鍾俊), e-mail: johnnysviva@outlook.com
 * @date 1/26/20 3:17 PM
 */
export class Enum {
  private readonly _description: string
  private readonly _value: number

  constructor (description: string, value: number) {
    this._description = description
    this._value = value
  }

  get description (): string {
    return this._description
  }

  get value (): number {
    return this._value
  }
}

export const ExerciseRelatedClassificationType = {
  /**
   * Utility
   */
  UTILITY: new Enum('Utility', 1),
  /**
   * Mechanics
   */
  MECHANICS: new Enum('Mechanics', 1),
  /**
   * Force
   */
  FORCE: new Enum('Force', 1),

  /**
   * Get status by value.
   * @param value {number} value
   * @throws Enum
   */
  getEnumByValue (value?: number): Enum {
    if (!value) {
      throw new Error(`Invalid code: ${value}.`)
    }
    let enumeration: Enum = new Enum('', -1)
    Object.keys(ExerciseRelatedClassificationType).forEach(statusKey => {
      // @ts-ignore
      if (typeof ExerciseRelatedClassificationType[statusKey] !== 'function' && ExerciseRelatedClassificationType[statusKey].code === code) {
        // @ts-ignore
        enumeration = ExerciseRelatedClassificationType[statusKey]
      }
    })
    if (enumeration.value === -1) {
      throw new Error(`Enum not found! Given code: ${value}.`)
    }
    return enumeration
  }
}

Object.freeze(ExerciseRelatedClassificationType)
