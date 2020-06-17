const chars = {
  'а': ['a', '4'],
  'б': ['b', '13', '6'],
  'в': ['v', 'w'],
  'г': ['g', '9'],
  'д': 'd',
  'е': ['e', '3'],
  'ё': ['e', '3'],
  'ж': 'zh',
  'з': ['z', '2'],
  'и': 'i',
  'й': ['i', 'y'],
  'к': 'k',
  'л': ['l', '1'],
  'м': 'm',
  'н': 'n',
  'о': ['o', '0'],
  'п': 'p',
  'р': 'r',
  'с': ['s', '5'],
  'т': ['t', '7'],
  'у': 'u',
  'ф': 'f',
  'х': ['kh', 'h'],
  'ц': 'ts',
  'ч': 'ch',
  'ш': 'sh',
  'щ': 'sch',
  // 'ъ': '',
  'ы': 'y',
  // 'ь': '',
  'э': 'e',
  'ю': ['yu', 'ju'],
  'я': ['ya', 'ja'],
}

const replaceCyrillic = (string, stringIndex) =>
  string.split('')
    .filter(char =>
      Object.keys(chars).includes(char))
    // .slice(0).reverse()
    .map((char, index) =>
      chars[char] ?
        Array.isArray(chars[char]) ?
          chars[char][index % chars[char].length]
          :
          chars[char]
        :
        char)
    .map((char, charIndex) =>
      charIndex % 5 === stringIndex % 5 || charIndex % 7 === stringIndex % 7 ?
        char.toUpperCase()
        :
        char)
    .join('')

const transliterate = (string, index) =>
  replaceCyrillic(
    string
      .toLowerCase()
      .replace('ье', 'ye')
      .replace('ия', 'ia')
      .replace('ья', 'ia')
      .replace('ий', 'y')
      .replace('ё', 'е')
    , index
  )

export default transliterate