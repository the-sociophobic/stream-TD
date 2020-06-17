import transliterate from './transliterate'
import texts from './texts'


const maxLength = 70

const chars = [
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ё',
  'ж',
  'з',
  'и',
  'й',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'ы',
  'э',
  'ю',
  'я',
]


const clearString = string =>
  [...string.toLowerCase()]
    .filter(char => chars.includes(char))
    .join('')
    
const hashArrayByLine = () =>
  texts
    .map(song =>
      song
        .split('\n')
        .filter(line => line.length > 7)
        .map(line => clearString(line))
        .map((line, index) => transliterate(line, index)))
    .reduce((a, b) => [...a, ...b])
    .map(line => line.slice(0, maxLength))

const hashArrayByChar = () =>
  clearString(
    texts
      .reduce((a, b) => [...a, ...b]).join(''))
    .match(new RegExp(`.{1,${maxLength}}`, "g"))
    .map((string25, index) => transliterate(string25, index))
    .slice(0, -1)


const generateTicketsInRange = (from, length, method) => {
  const acceptableLength = Math.min(Math.max(1, length), 1000)
  const array = method === "line" ? hashArrayByLine() : hashArrayByChar()
  const arrayFrom = from % array.length
  let bigArray = array 

  while (bigArray.length < arrayFrom + acceptableLength)
    bigArray = [...bigArray, ...array]

  return bigArray
    .slice(arrayFrom, arrayFrom + acceptableLength)
    .map((string, index) =>
      string + transliterate(
        [...index.toString()]
          .map(number => chars[parseInt(number)])
          .join('')))
}


export default generateTicketsInRange