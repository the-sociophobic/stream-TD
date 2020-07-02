const makeTwoSymbol = number =>
  number > 9 ? number : `0${number}`

export default seconds =>
  `${makeTwoSymbol(Math.floor(seconds / 60))}:${makeTwoSymbol(Math.floor(seconds % 60))}`