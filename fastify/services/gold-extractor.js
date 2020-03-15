exports.service = {
  async analyze({ trades }) {
    console.log('trades', trades);
    
    return {
      hasGold: false
    }
  }
};
