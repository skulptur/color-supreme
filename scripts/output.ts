/**
 * Calls a callback function a specified number of times and returns the results in an array.
 * @param iterations The number of times to call the callback function.
 * @param callback The callback function to call.
 * @returns An array containing the results of each callback function call.
 * @example
 * times(5)
 * // Returns [0, 1, 2, 3, 4]
 *
 *  times(5, (i) => i * 2)
 * // Returns [0, 2, 4, 6, 8]
 */
export const times = <T>(
  iterations: number,
  callback: (index: number) => T = (i) => i as T
): Array<T> => {
  // Initialize an empty array to store the results
  const result: Array<T> = []

  // Loop `iterations` number of times, calling the callback function on each iteration
  for (let i = 0; i < iterations; i++) {
    // Call the callback function with the current index and push the result to the results array
    result.push(callback(i))
  }

  // Return the results array
  return result
}



/**
 * Generates a sequence of values by applying a given function to an initial value for a specified number of iterations.
 * @param iterations The number of iterations to perform.
 * @param initialValue The initial value of the sequence.
 * @param iteratorFn The function to apply to the initial value and each subsequent value.
 * @returns An array containing all the iterations.
 * @example
 * generateSequence(5, 1, (value) => value * 2)
 * // Returns [1, 2, 4, 8, 16]
 */
export const generateSequence = <T>(
  iterations: number,
  initialValue: T,
  iteratorFn: (value: T) => T
): T[] => {
  if (iterations < 0) {
    throw new Error('Iterations must be a positive number')
  }

  if (iterations === 0) {
    return []
  }

  const sequence: T[] = [initialValue]
  let value = initialValue

  for (let i = 1; i < iterations; i++) {
    value = iteratorFn(value)
    sequence.push(value)
  }

  return sequence
}



/**
 * Maps an item in an array at a specified index to a new value.
 * @param array The array to map the item in.
 * @param index The index of the item to map.
 * @param mapFn A function that maps the item to a new value.
 * @returns A new array with the mapped item.
 * @example
 * const originalArray = [1, 2, 3, 4, 5]
 * const mappedArray = mapAt(originalArray, 2, (item) => item * 2)
 * // Returns [1, 2, 6, 4, 5]
 */
export const mapAt = <T>(array: Array<T>, index: number, mapFn: (item: T) => T): Array<T> => {
  // Check that the index is within the bounds of the array
  if (index > array.length || index < 0) {
    throw new Error('Index out of range')
  }

  // Get the item at the specified index
  const item = array[index]

  // Map the item to a new value using the mapFn function
  const newItem = mapFn(item)

  // If the new value is the same as the original value, return the original array
  if (newItem === item) {
    return array
  }

  // Create a new array with the mapped item
  const newArray = array.slice()
  newArray[index] = mapFn(array[index])

  return newArray
}



/**
 * Gets an item from an array based on a mapped index.
 * @param index The index of the item to get.
 * @param array The array to get the item from.
 * @param indexMapFn A function that maps the index to a new index.
 * @returns The item at the mapped index in the array.
 * @example
 * const array = ['a', 'b', 'c', 'd', 'e']
 * const indexMapFn = (index, length) => (index * 2) % length
 * getItem(2, array, indexMapFn)
 * // Returns 'e'
 */
export const getItem = <T>(
  index: number,
  array: Array<T>,
  indexMapFn: (index: number, length: number) => number
): T => {
  // Map the index to a new index using the indexMapFn function
  const mappedIndex = indexMapFn(index, array.length)

  // Return the item at the mapped index in the array
  return array[mappedIndex]
}



/**
 * Maps an index to a cyclic pattern.
 * @param index The original index.
 * @param length The length of the sequence.
 * @returns The mapped index in the cyclic pattern.
 * @example
 * cyclic(6, 5)
 * // Returns 1
 */
export const cyclic = (index: number, length: number): number => {
  // Calculate the mapped index based on the cyclic pattern
  const normalizedIndex = index % length
  return Math.abs(normalizedIndex >= 0 ? normalizedIndex : length + normalizedIndex)
}



/**
 * Maps an index to a palindrome pattern.
 * @param index The original index.
 * @param length The length of the sequence.
 * @returns The mapped index in the palindrome pattern.
 * @example
 * const length = 5
 * const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * indexes.map((index) => palindrome(index, length))
 * // Returns [0, 1, 2, 1, 0, 1, 2, 1, 0, 1]
 */
export const palindrome = (index: number, length: number): number => {
  // Save the length of the sequence in a variable
  const arraySize = length

  // If the sequence has only one element, return 0
  if (arraySize === 1) {
    return 0
  }

  // Calculate the mapped index based on the palindrome pattern
  const normalizedIndex = index % (2 * arraySize - 2)
  const id = normalizedIndex >= 0 ? normalizedIndex : 2 * arraySize - 2 + normalizedIndex

  if (id < arraySize) {
    return Math.abs(id)
  } else {
    return 2 * arraySize - id - 2
  }
}



/**
 * Returns the remainder of dividing the dividend by the divisor, with support for negative dividends.
 * @param dividend The dividend to divide.
 * @param divisor The divisor to divide by.
 * @returns The remainder of dividing the dividend by the divisor.
 * @example
 * // Basic usage
 * modulo(5, 3)
 * // Returns 2
 *
 * // Support for negative dividends
 * modulo(-5, -3)
 * // Returns 2
 *
 * // Support for negative divisors
 * modulo(-5, 3)
 * // Returns -2
 *
 * // Support for negative dividends and divisors
 * modulo(5, -3)
 * // Returns -2
 *
 */
export const modulo = (dividend: number, divisor: number): number => {
  // Compute the remainder of dividing the absolute value of the dividend by the absolute value of the divisor.
  const remainder = Math.abs(dividend) % Math.abs(divisor)

  // Compute the sign of the result based on the sign of the dividend and divisor.
  const sign = Math.sign(dividend) * Math.sign(divisor)

  // Compute the result by adjusting the remainder based on the sign.
  const result = remainder * sign

  // Return the result.
  return result
}





export type CellularAutomataRuleset = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

// a common rule that generates an interesting balance between chaos and order
const ruleset110: CellularAutomataRuleset = [0, 1, 1, 1, 1, 0, 0, 0]


export type BoundaryFunction = (index: number, length: number) => number


/**
 * Generates a new sequence using a one-dimensional cellular automaton.
 * @param sequence The initial sequence.
 * @param ruleset The ruleset for the cellular automaton.
 * @param boundaryFn The boundary function to use.
 * @returns The resulting sequence.
 * @example
 *
 * generateSequence(10, sequence, cellularAutomata)
 * // Returns [
 * //  [0, 0, 0, 0, 1, 0, 0, 0],
 * //  [0, 0, 0, 1, 1, 1, 0, 0],
 * //  [0, 0, 1, 1, 0, 0, 1, 0],
 * //  [0, 1, 1, 0, 1, 1, 1, 1],
 * //  [0, 1, 0, 0, 1, 0, 0, 0],
 * //  [1, 1, 1, 1, 1, 1, 0, 0],
 * //  [1, 0, 0, 0, 0, 0, 1, 1],
 * //  [0, 1, 0, 0, 0, 1, 1, 0],
 * //  [1, 1, 1, 0, 1, 1, 0, 1],
 * //  [0, 0, 0, 0, 1, 0, 0, 1],
 * // ]
 *
 * @complexity This function has a time complexity of O(n), where n is the length of the input sequence, and
 * a space complexity of O(n), where n is the length of the input sequence.
 */
export const cellularAutomata = (
  sequence: Array<number>,
  ruleset: CellularAutomataRuleset = ruleset110,
  boundaryFn: BoundaryFunction = cyclic
): Array<number> => {
  const nextSequence = new Array(sequence.length)
  const len = sequence.length

  // Apply the ruleset to each cell in the sequence
  for (let i = 0; i < len; i++) {
    const left = sequence[boundaryFn(i - 1, len)]
    const middle = sequence[i]
    const right = sequence[boundaryFn(i + 1, len)]
    nextSequence[i] = ruleset[left * 4 + middle * 2 + right]
  }

  return nextSequence
}



const numSort = (a: number, b: number) => a - b


/**
 * Generates a Euclidean rhythm sequence.
 * @param steps The number of steps in the sequence.
 * @param notes The number of notes in the sequence.
 * @param rotation The rotation of the sequence (default: 0).
 * @returns An array of indices representing the Euclidean rhythm sequence.
 * @example
 * euclideanSequencer(8, 3, 1)
 * // Returns [1, 3, 6]
 */
export const euclideanSequencer = (steps: number, notes: number, rotation = 0): Array<number> => {
  // Check that inputs are positive integers
  if (steps < 0 || notes < 0) {
    throw new Error('Inputs must be positive integers')
  }

  // Initialize an empty sequence array
  const sequence: Array<number> = []

  // Determine the maximum number of notes in the sequence
  const maxNotes = notes > steps ? steps : notes

  // Iterate through the number of notes and calculate the index for each note
  for (let i = 0; i < maxNotes; i++) {
    const index = Math.floor((i * steps) / maxNotes) // Calculate the index using the Euclidean algorithm
    sequence.push((index + rotation) % steps) // Add the index to the sequence, with rotation applied
  }

  // Sort the sequence in ascending order
  return sequence.sort(numSort)
}





/**
 * Generates a sequence of indices representing the "silences" (i.e. rests) in a Euclidean rhythm.
 * @param steps The number of steps in the rhythm.
 * @param notes The number of notes in the rhythm.
 * @param rotation The rotation of the rhythm (default: 0).
 * @returns An array of indices representing the silences in the Euclidean rhythm.
 * @example
 * euclideanSilences(8, 3)
 * // Returns [1, 3, 4, 6, 7]
 */
export const euclideanSilences = (steps: number, notes: number, rotation = 0): Array<number> => {
  // Generate the Euclidean rhythm sequence using the euclideanSequencer function
  const noteSequence = euclideanSequencer(steps, notes, rotation)

  // Initialize an empty silence sequence array
  const silenceSequence: Array<number> = []

  // Iterate through each step in the rhythm and add the index to the silence sequence if it is not in the note sequence
  for (let i = 0; i < steps; i++) {
    if (!noteSequence.includes(i)) {
      silenceSequence.push(i)
    }
  }

  // Return the silence sequence
  return silenceSequence
}



export type TransitionMatrix = Array<number>[]


/**
 * Creates a transition matrix from an array of numbers.
 * @param {Array<number>} data - The array of numbers to create the transition matrix from.
 * @returns {TransitionMatrix} The transition matrix created from the input array.
 */
export const createTransitionMatrix = (data: Array<number>): TransitionMatrix => {
  const matrix: TransitionMatrix = []
  const states = Array.from(new Set(data))

  for (const state of states) {
    const row = new Array(states.length).fill(0)
    const stateIndices = data.flatMap((value, index) => (value === state ? index : []))
    const nextStates = data.slice(1).filter((_, index) => stateIndices.includes(index))

    for (const nextState of nextStates) {
      row[nextState] += 1
    }

    const total = row.reduce((sum, value) => sum + value, 0)

    if (total > 0) {
      matrix.push(row.map((count) => count / total))
    } else {
      matrix.push(row)
    }
  }

  return matrix
}


/**
 * Gets the next state based on the current state and the transition matrix.
 * @param {number} currentState - The current state.
 * @param {TransitionMatrix} transitionMatrix - The transition matrix.
 * @returns {number} The next state.
 */
export const getNextState = (
  currentState: number,
  transitionMatrix: TransitionMatrix,
  random = Math.random
): number => {
  const row = transitionMatrix[currentState]
  const r = random()
  let sum = 0

  for (let i = 0; i < row.length; i++) {
    sum += row[i]

    if (r <= sum) {
      return i
    }
  }

  return currentState
}


/**
 * Generates a sequence of numbers based on the input data and length.
 * @param {Array<number>} data - The input data to generate the sequence from.
 * @param {number} length - The length of the sequence to generate.
 * @returns {Array<number>} The generated sequence of numbers.
 */
export const markovSequence = (
  data: Array<number>,
  length: number,
  random = Math.random
): Array<number> => {
  const transitionMatrix = createTransitionMatrix(data)
  let currentState = data[0]
  const sequence = [currentState]

  for (let i = 1; i < length; i++) {
    currentState = getNextState(currentState, transitionMatrix, random)
    sequence.push(currentState)
  }

  return sequence
}





/**
 * Splits an array into chunks based on a pattern.
 * @param array The array to split.
 * @param pattern The pattern to split the array with.
 * @returns An array of arrays representing the splits.
 * @example
 * patternChunks([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3])
 * // Returns [[1], [2, 3], [4, 5, 6], [7], [8]]
 *
 * @remarks
 * This function splits the input array into chunks based on the specified pattern. The pattern is an array of
 * numbers that determines the size of each chunk. If the pattern is shorter than the input array, it will be
 * repeated cyclically. If the pattern is longer than the input array, the remaining elements will be discarded.
 */
export const patternChunks = <T>(array: Array<T>, pattern: Array<number>): Array<Array<T>> => {
  const result: Array<Array<T>> = []
  const _array = [...array]
  let i = 0

  while (_array.length > 0) {
    result.push(_array.splice(0, getItem(i, pattern, cyclic)))
    i++
  }

  return result
}



/**
 * Converts an array of binary digits to an array of indices where the digit is 1.
 * @param binary An array of binary digits (0 or 1).
 * @returns An array of indices where the digit is 1.
 * @example
 * binaryToIndices([1, 0, 1, 1, 0, 1])
 * // Returns [0, 2, 3, 5]
 *
 * binaryToIndices([1, 1, 1, 1, 1])
 * // Returns [0, 1, 2, 3, 4]
 *
 * binaryToIndices([0, 0, 0, 0, 0])
 * // Returns []
 *
 */
export const binaryToIndices = (binary: Array<number>): Array<number> => {
  // Initialize an empty array to store the indices.
  const indices: Array<number> = []

  // Loop through the binary array.
  for (let i = 0; i < binary.length; i++) {
    // If the digit is 1, add the index to the indices array.
    if (binary[i] === 1) {
      indices.push(i)
    }
  }

  // Return the array of indices.
  return indices
}



/**
 * Converts an array of indices to a binary array where the indices are 1 and the other digits are 0.
 * @param indices An array of indices.
 * @param length The length of the binary array to be returned.
 * @returns A binary array where the indices are 1 and the other digits are 0.
 * @example
 * // Basic usage
 * indicesToBinary([0, 2, 4], 5)
 * // Returns [1, 0, 1, 0, 1]
 *
 * // Ignoring negative indices
 * indicesToBinary([0, -1, 2, -2, 4], 5)
 * // Returns [1, 0, 1, 0, 1]
 *
 * // Indices outside range are ignored
 * indicesToBinary([0, 2, 4, 6], 5)
 * // Returns [1, 0, 1, 0, 1]
 */
export const indicesToBinary = (indices: Array<number>, length: number): Array<number> => {
  // Initialize a binary array of the given length, filled with 0s.
  const binary: Array<number> = Array(length).fill(0)

  // Loop through the indices array.
  for (const index of indices) {
    // Ignore negative indices.
    if (index >= 0) {
      // If the index is within range, set the corresponding digit to 1.
      if (index < length) {
        binary[index] = 1
      }
    }
  }

  // Return the binary array.
  return binary
}


