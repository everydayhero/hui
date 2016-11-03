import creditCards from '../creditCards'

describe('containsValidCard', () => {
  it('should return true if the text contains a valid card number in its content', () => {
    const containsAmex = 'Please use my card for $10: 376361091078164. Thanks, Bob'
    expect(creditCards.containsValidCard(containsAmex)).to.be.true
  })

  it('should return true if there is a CC number that includes hyphens', () => {
    const containsMC = 'This is my number, please steal my money: 5174-3510-4414-8571.'
    expect(creditCards.containsValidCard(containsMC)).to.be.true
  })

  it('should return true if there is a CC number that includes spaces', () => {
    const containsDiscover = 'Steal this card! 6011 2690 3613 9223'
    expect(creditCards.containsValidCard(containsDiscover)).to.be.true
  })

  it('should return false if there is an invalid number in there', () => {
    const invalidString = 'This is not really a CC number: 6011 1234 1234 1234'
    expect(creditCards.containsValidCard(invalidString)).to.be.false
  })

  it('should return false if there is nothing that looks like a card number', () => {
    const noWorries = 'This is just a regular text value! No cards here, sir.'
    expect(creditCards.containsValidCard(noWorries)).to.be.false
  })
})
