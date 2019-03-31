
const PROMOTION_TYPES = {
  COUPON: 1,
  REDUCE_ONCE: 2,
  REDUCE_REPEAT: 3
};

class Promotion {
  constructor(condition, denomination) {
    this.condition = condition;
    this.denomination = denomination;

    this.products = [];
  }

  /**
   * 根据商品获取最低满足数量及平均减价
   * @param product
   * @returns {{reduce: number, amount: number}}
   */
  minMatchedAmountReduce(product) {
    let amount = 1, reduce, denomination = this.denomination;
    while(1) {
      if (product.basePrice() * amount >= this.condition) {
        break;
      }
      amount++;
    }
    if (this.type === PROMOTION_TYPES.REDUCE_REPEAT) {
      const repeat = Math.floor(product.basePrice() * amount / this.condition);
      denomination = repeat * this.denomination;
    }
    reduce = denomination / amount;
    return { amount, reduce };
  }
}

/**
 * 优惠券
 */
class Coupon extends Promotion {

  /**
   *
   * @param condition 条件
   * @param denomination 面额
   */
  constructor([condition, denomination]) {
    super(condition, denomination);
    this.type = PROMOTION_TYPES.COUPON;
  }
}

/**
 * 满减
 */
class ReduceOnce extends Promotion {

  /**
   *
   * @param condition 条件
   * @param denomination 面额
   */
  constructor([condition, denomination]) {
    super(condition, denomination);
    this.type = PROMOTION_TYPES.REDUCE_ONCE;
  }
}

/**
 * 每满减
 */
class ReduceRepeat extends Promotion {

  /**
   *
   * @param condition 条件
   * @param denomination 面额
   */
  constructor([condition, denomination]) {
    super(condition, denomination);
    this.type = PROMOTION_TYPES.REDUCE_REPEAT;
  }
}

export {
  Coupon, ReduceOnce, ReduceRepeat
};
