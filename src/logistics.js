export default class Logistics {
  /**
   * 物流信息
   * @param {string} company 物流公司
   * @param {number} firstPrice 首重价格
   * @param {number} increment 续重价格
   * @param {number} firstWeight 首重(kg)
   * @param {number} discount 折扣(0-1)
   * @param {array} coverage 覆盖范围
   */
  constructor(company, firstPrice, increment, firstWeight, discount = 1, coverage = []) {
    this.company = company;
    this.firstPrice = firstPrice;
    this.increment = increment;
    this.firstWeight = firstWeight;
    this.discount = discount;
    this.coverage = coverage;
  }

  cost(weight) {
    const inWeight = Math.max(0, weight - this.firstWeight);
    return (this.firstPrice + inWeight * this.increment) * this.discount;
  }
}
