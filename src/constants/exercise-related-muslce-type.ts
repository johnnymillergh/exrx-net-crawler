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

// AGONIST("Agonist - a muscle that causes motion.", 1),
//   ANTAGONIST("Antagonist - a muscle that can move the joint opposite to the movement produced by the agonist.", 2),
//   TARGET("Target - the primary muscle intended for exercise.", 3),
//   SYNERGIST("Synergist - a muscle that assists another muscle to accomplish a movement.", 4),
//   STABILIZER("Stabilizer - a muscle that contracts with no significant movement to maintain a posture or fixate a " +
//     "joint.", 5),
//   DYNAMIC_STABILIZER("Dynamic Stabilizer - also known as Fixator, occurs during many compound movements.", 6),
//   ANTAGONIST_STABILIZER("Antagonist Stabilizer - a muscle that contracts to maintain the tension potential of a " +
//     "biarticulate muscle at the adjacent joint.", 7);

export const ExerciseRelatedMuscleType = {
  /**
   * Agonist - a muscle that causes motion.
   */
  AGONIST: new Enum('Agonist', 1),
  /**
   * Antagonist - a muscle that can move the joint opposite to the movement produced by the agonist.
   */
  ANTAGONIST: new Enum('Antagonist', 2),
  /**
   * Target - the primary muscle intended for exercise.
   */
  TARGET: new Enum('Target', 3),
  /**
   * Synergist - a muscle that assists another muscle to accomplish a movement.
   */
  SYNERGIST: new Enum('Synergist', 4),
  /**
   * Stabilizer - a muscle that contracts with no significant movement to maintain a posture or fixate a joint.
   */
  STABILIZER: new Enum('Stabilizer', 5),
  /**
   * Dynamic Stabilizer - also known as Fixator, occurs during many compound movements.
   */
  DYNAMIC_STABILIZER: new Enum('Dynamic Stabilizer', 6),
  /**
   * Antagonist Stabilizer - a muscle that contracts to maintain the tension potential of a biarticulate muscle at the adjacent joint.
   */
  ANTAGONIST_STABILIZER: new Enum('Antagonist Stabilizer', 7),

  /**
   * Get array of Exercise Related Muscle Type.
   * @return {Array} an array of Exercise Related Muscle Type.
   */
  getArray: () => {
    const array = [] as Enum[]
    Object.keys(ExerciseRelatedMuscleType).forEach(enumKey => {
      // @ts-ignore
      if (ExerciseRelatedMuscleType[enumKey] instanceof Enum) {
        // @ts-ignore
        array.push(ExerciseRelatedMuscleType[enumKey])
      }
    })
    return array
  },

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
    Object.keys(ExerciseRelatedMuscleType).forEach(statusKey => {
      // @ts-ignore
      if (typeof ExerciseRelatedMuscleType[statusKey] !== 'function' && ExerciseRelatedMuscleType[statusKey].code === code) {
        // @ts-ignore
        enumeration = ExerciseRelatedMuscleType[statusKey]
      }
    })
    if (enumeration.value === -1) {
      throw new Error(`Enum not found! Given code: ${value}.`)
    }
    return enumeration
  }
}

Object.freeze(ExerciseRelatedMuscleType)
