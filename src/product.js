import config from '../config';

export default class Product {
  /**
   * 商品
   * @param {string} name 商品名称
   * @param {number} price 商品定价
   * @param {number} cost 商品成本
   * @param {number} pack 包装
   * @param {number} weight 毛重(kg)
   * @param {Logistics} logistics 物流
   */
  constructor(name, price, cost, pack, weight, logistics) {
    this.price = price;
    this.name = name;
    this.cost = cost;
    this.pack = pack;
    this.weight = weight;
    this.logistics = logistics;

    this.material = config.material;                // 物料
    this.grossProfitRate = config.grossProfitRate;  // 毛利率
    this.marketingRate = config.marketingRate;      // 营销占比
    this.platformCost = config.platformCost;        // 平台扣点

    this.coupons = [];
    this.reduces = [];
  }

  /**
   * 添加优惠券
   * @param {Coupon} coupon 优惠券
   */
  addCoupon(...coupon) {
    this.coupons = this.coupons.concat(coupon);
  }

  /**
   * 添加满减优惠
   * @param {Promotion} reduce 优惠券
   */
  addReduce(...reduce) {
    this.reduces = this.reduces.concat(reduce);
  }

  /**
   * 获取物流费用
   * @param {number} n 数量
   * @returns {*}
   */
  logisticsCost(n = 1) {
    return this.logistics.cost(this.weight * n + 1);
  }

  /**
   * 平均到手价
   * @param {number} n 数量
   */
  lastPrice(n = 1) {
    const cost = (this.cost + this.pack) * n + this.logisticsCost(n) + this.material;
    const rate = 1 - this.grossProfitRate - this.marketingRate - this.platformCost;
    return Math.ceil(cost / rate / n);
  }

  /**
   * 生成优惠
   * @returns {Array}
   */
  generatePromotions() {
    const promotions = [];
    for (let n=1; n < 10; n++) {
      let price = this.lastPrice(n);
      let denomination = Math.ceil(n * (this.price - price));
      let condition = Math.max(Math.ceil(denomination/0.8), this.price * (n-1)+1);
      promotions.push({n, price, condition, denomination});
    }
    return promotions;
  }
}
