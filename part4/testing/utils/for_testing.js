const palindrome = (string) => 
  string.split('').reverse().join('')

const average = (array) =>
array.length ? array.reduce((a, b) => a + b, 0) / array.length : 0

module.exports = {
  palindrome,
  average
}